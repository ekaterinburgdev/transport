import { State } from 'common/types/state';
import { ClientUnit } from 'transport-common/types/masstrans';

export const initialState: State['publicTransport'] = {
    currentStop: null,
    currentVehicle: null,
    currentRoute: null,
    stops: [],
    vehicleStops: [],
    stopVehicles: [],
    stopInfo: [],
    units: {
        [ClientUnit.Bus]: [],
        [ClientUnit.Tram]: [],
        [ClientUnit.Troll]: [],
    },
};
