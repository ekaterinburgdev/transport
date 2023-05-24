import { createStrapiMethods } from 'transport-common/strapi/create-methods';
import { StrapiContentTypes, StrapiStop, StrapiUnitInfo } from 'transport-common/types/strapi';

import { ClientUnit, UnitArriveStop } from 'transport-common/types/masstrans';
import { fetchApi } from 'api/utils/fetch';

const strapiStops = createStrapiMethods(StrapiContentTypes.Stop);
const strapiUnitInfo = createStrapiMethods(StrapiContentTypes.UnitInfo);

export const massTransApi = {
    getVehicles: (type: ClientUnit) =>
        fetchApi(`/api/masstrans/${type}`, {
            dataField: 'data',
            cache: 'no-store',
        }),
    getStops: () => strapiStops.getAll() as Promise<StrapiStop[]>,
    getUnitInfo: (type: ClientUnit, boardId: number, stateNumber: string) => {
        const filterNumber = stateNumber.includes(boardId.toString()) ? stateNumber : boardId;

        return strapiUnitInfo.getAll(
            `filters[type][$eq]=${type}&filters[boardNumber][$eq]=${filterNumber}`,
            true,
        ) as Promise<StrapiUnitInfo[]>;
    },
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
