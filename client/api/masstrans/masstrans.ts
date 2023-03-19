import { createStrapiMethods } from 'transport-common/strapi/create-methods';
import { StrapiContentTypes, StrapiStop } from 'transport-common/types/strapi';

import { VehicleType } from 'common/types/masstrans';
import { fetchInternalApi } from 'api/utils/fetch';

const strapiStops = createStrapiMethods(StrapiContentTypes.Stop);

export const massTransApi = {
    getVehicles: (type: VehicleType) =>
        fetchInternalApi(`http://map.ettu.ru/api/v2/${type}/boards/?apiKey=111&order=1`, {
            dataField: 'vehicles',
        }),
    getRoutes: (type: VehicleType) =>
        fetchInternalApi(`http://map.ettu.ru/api/v2/${type}/routes/?apiKey=111`, {
            dataField: 'routes',
        }),
    getStops: () => strapiStops.getAll() as Promise<StrapiStop[]>,
    getPoints: (type: VehicleType) =>
        fetchInternalApi(`http://map.ettu.ru/api/v2/${type}/points/?apiKey=111`, {
            dataField: 'points',
        }),
};
