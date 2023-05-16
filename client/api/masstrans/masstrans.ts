import { createStrapiMethods } from 'transport-common/strapi/create-methods';
import { StrapiContentTypes, StrapiStop } from 'transport-common/types/strapi';

import { ClientUnit, UnitArriveStop } from 'transport-common/types/masstrans';
import { fetchApi } from 'api/utils/fetch';

const strapiStops = createStrapiMethods(StrapiContentTypes.Stop);

export const massTransApi = {
    getVehicles: (type: ClientUnit) =>
        fetchApi(`/api/masstrans/${type}`, {
            dataField: 'data',
            cache: 'no-store',
        }),
    getStops: () => strapiStops.getAll() as Promise<StrapiStop[]>,
    getRoute: (routeId: number) =>
        fetchApi(`/api/masstrans/route/${routeId}`, {
            dataField: 'data',
            cache: 'no-store',
        }),
    getStopInfo: (stopId: string) =>
        fetchApi(`/api/masstrans/stop/${stopId}`, {
            dataField: 'data',
            cache: 'no-store',
        }),
    getVehicleInfo: (unitId: string) =>
        fetchApi(`/api/masstrans/unit/${unitId}`, {
            dataField: 'data',
            cache: 'no-store',
        }) as Promise<UnitArriveStop[]>,
};
