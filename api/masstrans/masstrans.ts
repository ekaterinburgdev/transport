import { VehicleType } from "../../components/Map/Transport/MapTransport";
import { fetchInternalApi } from "../utils/fetch";


export const massTransApi = {
    getVehicles: (type: VehicleType) => fetchInternalApi(
        `http://map.ettu.ru/api/v2/${type}/boards/?apiKey=111&order=1`, {
            dataField: 'vehicles',
        },
    ),
    getRoutes: (type: VehicleType) => fetchInternalApi(
        `http://map.ettu.ru/api/v2/${type}/routes/?apiKey=111`, {
            dataField: 'routes',
        },
    ),
    getStations: (type: VehicleType) => fetchInternalApi(
        `http://map.ettu.ru/api/v2/${type}/stations/?apiKey=111`, {
            dataField: 'points',
        },
    ),
    getPoints: (type: VehicleType) => fetchInternalApi(
        `http://map.ettu.ru/api/v2/${type}/points/?apiKey=111`, {
            dataField: 'points',
        },
    ),
};