import { createStrapiMethods } from 'transport-common/strapi/create-methods';
import { TRANSPORT_API_URL } from 'transport-common/strapi/constants';
import { StrapiContentTypes, StrapiStop, StrapiUnitInfo } from 'transport-common/types/strapi';
import { ClientUnit, Route, StopInfoItem, UnitArriveStop } from 'transport-common/types/masstrans';
import { fetchApi } from 'api/utils/fetch';

const strapiStops = createStrapiMethods(StrapiContentTypes.Stop);
const strapiUnitInfo = createStrapiMethods(StrapiContentTypes.UnitInfo);

export const massTransApi = {
    getVehicles: (type: ClientUnit) =>
        fetchApi(`${TRANSPORT_API_URL}/api/masstrans/${type}`, {
            dataField: 'data',
            cache: 'no-store',
        }),
    getStops: () => strapiStops.getAll() as Promise<StrapiStop[]>,
    getUnitInfo: ({
        type,
        boardId,
        stateNumber,
        num,
    }: {
        type: ClientUnit;
        boardId: number;
        stateNumber: string;
        num: string;
    }) => {
        let filterNumber = type === ClientUnit.Bus ? stateNumber : boardId;

        if (type === ClientUnit.Tram) {
            if (num === '333') {
                filterNumber = filterNumber.toString().padStart(5, '0');
            } else {
                filterNumber = filterNumber.toString().padStart(3, '0');
            }
        }

        return strapiUnitInfo.getAll(
            `filters[type][$eq]=${type}&filters[boardNumber][$eq]=${filterNumber}`,
            true,
        ) as Promise<StrapiUnitInfo[]>;
    },
    getRoute: (routeId: number) =>
        fetchApi(`${TRANSPORT_API_URL}/api/masstrans/route/${routeId}`, {
            dataField: 'data',
            cache: 'no-store',
        }) as Promise<Route>,
    getStopInfo: (stopId: string) =>
        fetchApi(`${TRANSPORT_API_URL}/api/masstrans/stop/${stopId}`, {
            dataField: 'data',
            cache: 'no-store',
        }) as Promise<StopInfoItem[]>,
    getVehicleInfo: (unitId: string) =>
        fetchApi(`/api/masstrans/unit/${unitId}`, {
            dataField: 'data',
            cache: 'no-store',
        }) as Promise<UnitArriveStop[]>,
};
