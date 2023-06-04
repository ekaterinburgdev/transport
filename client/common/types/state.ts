import { Route, StopInfoItem, Unit } from 'transport-common/types/masstrans';
import { StrapiStop } from 'transport-common/types/strapi';

export interface State {
    publicTransport: {
        currentVehicle: Pick<Unit, 'num' | 'routeId' | 'routeDirection' | 'type'> | null;
        currentStop: string | null;
        currentRoute: Route & Pick<Unit, 'type' | 'routeDirection'>;
        stops: StrapiStop[];
        vehicleStops: StrapiStop['attributes']['stopId'][];
        stopVehicles: Pick<StopInfoItem, 'route' | 'type'>[];
        stopInfo: StopInfoItem[];
    };
}

export type CurrentVehiclePayload = State['publicTransport']['currentVehicle'];
export interface SetCurrentVehiclePayload {
    currentVehicle: CurrentVehiclePayload;
    currentRoute: State['publicTransport']['currentRoute'];
}
export type CurrentStopPayload = State['publicTransport']['currentStop'];
export interface SetCurrentStopPayload {
    currentStop: CurrentStopPayload;
    stopInfo: State['publicTransport']['stopInfo'];
}
export type SetStopsPayload = State['publicTransport']['stops'];
