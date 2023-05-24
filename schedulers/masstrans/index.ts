import _ from 'lodash';

import { JsonRpcMethods } from 'transport-server/model/ekaterinburg-rf/ekaterinburg-rf.constants';
import { EkaterinburgRfModel } from 'transport-server/model/ekaterinburg-rf/ekaterinburg-rf';
import { createStrapiMethods } from 'transport-common/strapi/create-methods';
import { StopType, Stop, TransportTree } from 'transport-common/types/masstrans';
import { loginStrapi } from 'transport-common/strapi/login';
import { StrapiContentTypes, StrapiStop, StrapiTree } from 'transport-common/types/strapi';

import { runParallelJobs } from '../utils/runParallelJobs';
import { serverToClientMappers } from './mappers';

const model = new EkaterinburgRfModel();

async function updateStopsInStrapi(stops: Stop[], jwt: string) {
    const strapiStops = createStrapiMethods(StrapiContentTypes.Stop, jwt);

    const stopsFromStrapi = (await strapiStops.getAll()) as StrapiStop[];
    const flatStopsFromStrapi = stopsFromStrapi.map((stop) => ({
        id: stop.id,
        ...stop.attributes,
    })) as (Stop & { id: number })[];

    const newStops = _.differenceBy(stops, flatStopsFromStrapi, 'stopId');
    const oldStopsIds = _.differenceBy(flatStopsFromStrapi, stops, 'stopId').map((stop) => stop.id);
    const updatedStops = _.intersectionBy(stops, flatStopsFromStrapi, 'stopId').map((stop) => ({
        ...stop,
        id: flatStopsFromStrapi.find((strapiStop) => strapiStop.stopId === stop.stopId)!.id,
    }));

    if (newStops.length) {
        await runParallelJobs(newStops, strapiStops.publish);
    }

    if (updatedStops.length) {
        await runParallelJobs(updatedStops, strapiStops.update);
    }

    if (oldStopsIds) {
        await runParallelJobs(oldStopsIds, strapiStops.deleteById);
    }
}

async function updateTreeInStrapi(tree: TransportTree, jwt: string) {
    const strapiTree = createStrapiMethods(StrapiContentTypes.TransportTree, jwt);

    const treeFromStrapi = (await strapiTree.getAll()) as StrapiTree[];
    const oldTreesIds = treeFromStrapi.map((treeOfType) => treeOfType.id);

    await runParallelJobs(Object.values(tree), strapiTree.publish);

    if (oldTreesIds.length) {
        await runParallelJobs(oldTreesIds, strapiTree.deleteById);
    }
}

async function updateMasstrans() {
    const transportTree = await model.getTransTypeTree();
    const processedTransportTree =
        serverToClientMappers[JsonRpcMethods.GetTransTypeTree](transportTree);

    const busRoutesIds = processedTransportTree.bus.ids;
    const tramRoutesIds = processedTransportTree.tram.ids;
    const trollRoutesIds = processedTransportTree.troll.ids;

    const busRoutes = await runParallelJobs(busRoutesIds, model.getRoute.bind(model));
    const tramRoutes = await runParallelJobs(tramRoutesIds, model.getRoute.bind(model));
    const trollRoutes = await runParallelJobs(trollRoutesIds, model.getRoute.bind(model));

    const busStops = serverToClientMappers[JsonRpcMethods.GetRoute](busRoutes);
    const tramStops = serverToClientMappers[JsonRpcMethods.GetRoute](tramRoutes);
    const trollStops = serverToClientMappers[JsonRpcMethods.GetRoute](trollRoutes);

    const trollBusStops = _.intersectionBy(busStops, trollStops, 'stopId');
    _.pullAllBy(busStops, trollBusStops, 'stopId');
    _.pullAllBy(trollStops, trollBusStops, 'stopId');

    try {
        const jwt = await loginStrapi();
        console.log('Logged in strapi');

        console.log('Updating transport tree in strapi');
        await updateTreeInStrapi(processedTransportTree, jwt);
        console.log('Updated transport tree in strapi');

        const stopsWithType = [
            ...busStops.map((stop) => ({ ...stop, type: StopType.Bus })),
            ...tramStops.map((stop) => ({ ...stop, type: StopType.Tram })),
            ...trollStops.map((stop) => ({ ...stop, type: StopType.Troll })),
            ...trollBusStops.map((stop) => ({ ...stop, type: StopType.TrollBus })),
        ];

        console.log('Updating stops in strapi');
        await updateStopsInStrapi(stopsWithType, jwt);
        console.log('Updated stops in strapi');
    } catch (e) {
        console.error(e);
    }
}

updateMasstrans();
