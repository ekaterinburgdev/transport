import _ from 'lodash';
import fetch from 'node-fetch';

import FormData from 'form-data';

import { createStrapiMethods } from 'transport-common/strapi/create-methods';
import { deleteFile, uploadFile } from 'transport-common/strapi/upload';
import { loginStrapi } from 'transport-common/strapi/login';
import { ClientUnit, UnitInfo } from 'transport-common/types/masstrans';
import { StrapiContentTypes, StrapiUnitInfo } from 'transport-common/types/strapi';

import { getTransportInfo, getFactoryNamesByModelsAndType } from './crawler';

async function updateUnitInfoInStrapi(
    infos: UnitInfo[],
    factories: Record<string, string>,
    jwt: string,
    type: ClientUnit,
) {
    const strapiUnitInfo = createStrapiMethods(StrapiContentTypes.UnitInfo, jwt);

    const unitInfosFromStrapi = (await strapiUnitInfo.getAll(
        `filters[type][$eq]=${type}`,
        true,
    )) as StrapiUnitInfo[];
    const flatUnitInfosFromStrapi = unitInfosFromStrapi.map((unitInfo) => ({
        id: unitInfo.id,
        ...unitInfo.attributes,
    })) as (UnitInfo & { id: number })[];

    const newUnitInfos = _.differenceBy(
        infos,
        flatUnitInfosFromStrapi,
        (info) => info.type + info.boardNumber,
    );
    const updatedUnitInfos = _.intersectionBy(
        infos,
        flatUnitInfosFromStrapi,
        (info) => info.type + info.boardNumber,
    ).map((unitInfo) => ({
        ...unitInfo,
        id: flatUnitInfosFromStrapi.find(
            (strapiUnitInfo) => strapiUnitInfo.boardNumber === unitInfo.boardNumber,
        )!.id,
    }));

    if (newUnitInfos.length) {
        for (const info of newUnitInfos) {
            let imageId: number | undefined = undefined;

            if (info.imageUrl) {
                const imageFile = await fetch(info.imageUrl).then((res) => res.buffer());
                const form = new FormData();

                form.append('files', imageFile, `${info.type}-${info.boardNumber}.jpg`);

                const response = await uploadFile(form, jwt);

                imageId = response[0]?.id;
            }

            console.log('start publishing');
            await strapiUnitInfo.publish({
                ...info,
                image: imageId,
                factory: factories[info.model],
            });
            console.log('end publishing');
        }
    }

    if (updatedUnitInfos.length) {
        for (const info of updatedUnitInfos) {
            const infoFromStrapi = flatUnitInfosFromStrapi.find((inf) => inf.id === info.id);

            if (!infoFromStrapi) {
                continue;
            }

            if (info.imageUrl && info.imageUrl !== infoFromStrapi.imageUrl) {
                const imageFile = await fetch(info.imageUrl).then((res) => res.buffer());
                const form = new FormData();

                form.append('files', imageFile, `${info.type}-${info.boardNumber}.jpg`);

                console.log('uploading new image to strapi');
                const response = await uploadFile(form, jwt);

                const imageId = response[0]?.id;

                console.log('updating unit info in strapi');
                await strapiUnitInfo.update({
                    ...infoFromStrapi,
                    image: imageId,
                    imageUrl: info.image,
                });
                console.log('deleting old image from strapi');

                if (!infoFromStrapi.image?.data.id) {
                    continue;
                }

                await deleteFile(infoFromStrapi.image.data.id, jwt);
                console.log('deleted old image from strapi');
            }
        }
    }
}

async function main() {
    const transportInfo = await getTransportInfo();

    const busesModels = transportInfo.buses.map((bus) => bus.model).filter(Boolean) as string[];
    const trollsModels = transportInfo.trolls
        .map((troll) => troll.model)
        .filter(Boolean) as string[];
    const tramsModels = transportInfo.trams.map((tram) => tram.model).filter(Boolean) as string[];

    const busesFactories = await getFactoryNamesByModelsAndType(busesModels, ClientUnit.Bus);
    const trollsFactories = await getFactoryNamesByModelsAndType(trollsModels, ClientUnit.Troll);
    const tramsFactories = await getFactoryNamesByModelsAndType(tramsModels, ClientUnit.Tram);

    const jwt = await loginStrapi();

    const trollsInfoWithType = transportInfo.trolls.map((troll) => ({
        ...troll,
        type: ClientUnit.Troll,
    }));
    await updateUnitInfoInStrapi(trollsInfoWithType, trollsFactories, jwt, ClientUnit.Troll);

    const busesInfoWithType = transportInfo.buses.map((bus) => ({ ...bus, type: ClientUnit.Bus }));
    await updateUnitInfoInStrapi(busesInfoWithType, busesFactories, jwt, ClientUnit.Bus);

    const tramsInfoWithType = transportInfo.trams.map((tram) => ({
        ...tram,
        type: ClientUnit.Tram,
    }));
    await updateUnitInfoInStrapi(tramsInfoWithType, tramsFactories, jwt, ClientUnit.Tram);
}

main();
