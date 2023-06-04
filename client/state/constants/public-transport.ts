import { State } from 'common/types/state';

export const initialState: State['publicTransport'] = {
    currentStop: null,
    currentVehicle: null,
    currentRoute: null,
    stops: [],
    vehicleStops: [],
    stopVehicles: [],
    stopInfo: [],
};
