import _ from 'lodash';

import { GetTransTypeTreeResponse } from 'transport-server/model/ekaterinburg-rf/ekaterinburg-rf.types';
import { JsonRpcMethods } from 'transport-server/model/ekaterinburg-rf/ekaterinburg-rf.constants';
import { ServerRoute } from 'transport-common/types/ekaterinburg-rf';
import { Stop, TransportTree } from 'transport-common/types/masstrans';

export const serverToClientMappers = {
    [JsonRpcMethods.GetTransTypeTree]: (transportTree: GetTransTypeTreeResponse) => {
        const flatTree = transportTree.map((transportTypeTree) => ({
            type: transportTypeTree.tt_title_en.toLocaleLowerCase().slice(0, 5),
            numbers: transportTypeTree.routes.map((route) => route.mr_num),
            ids: transportTypeTree.routes.map((route) => route.mr_id),
            numberToId: _.keyBy(
                transportTypeTree.routes.map((route) => ({
                    id: route.mr_id,
                    number: route.mr_num,
                })),
                'number',
            ),
        }));

        return _.keyBy(flatTree, 'type') as TransportTree;
    },
    [JsonRpcMethods.GetRoute]: (routes: ServerRoute[]) => {
        const flatStops = routes
            .filter((route) => Boolean(route.races))
            .map((route) => route.races.map((race) => race.stopList))
            .flat(2);

        return _.uniqBy(flatStops, 'st_id').map<Omit<Stop, 'type'>>((stop) => ({
            stopId: stop.st_id,
            coords: [parseFloat(stop.st_lat), parseFloat(stop.st_long)],
            title: stop.st_title,
        }));
    },
};
