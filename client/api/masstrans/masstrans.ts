import { createStrapiMethods } from 'transport-common/strapi/create-methods';
import { StrapiContentTypes, StrapiStop } from 'transport-common/types/strapi';

import { ClientUnit } from 'transport-common/types/masstrans';
import { fetchInternalApi, fetchApi } from 'api/utils/fetch';

const strapiStops = createStrapiMethods(StrapiContentTypes.Stop);

export const massTransApi = {
    getVehicles: (type: ClientUnit) =>
        fetchApi(`/api/masstrans/${type}`, {
            dataField: 'data',
            cache: 'no-store',
        }),
    getRoutes: (type: ClientUnit) =>
        fetchInternalApi(`http://map.ettu.ru/api/v2/${type}/routes/?apiKey=111`, {
            dataField: 'routes',
        }),
    getStops: () => strapiStops.getAll() as Promise<StrapiStop[]>,
    getPoints: (type: ClientUnit) =>
        fetchInternalApi(`http://map.ettu.ru/api/v2/${type}/points/?apiKey=111`, {
            dataField: 'points',
        }),
};
