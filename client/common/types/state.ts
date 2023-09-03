import { Route, StopInfoItem, Unit } from 'transport-common/types/masstrans';
import { StrapiStop } from 'transport-common/types/strapi';

export interface State {
    publicTransport: {
        currentVehicle: Pick<Unit, 'num' | 'routeId' | 'routeDirection' | 'type'> | null;
        currentStop: string | null;
        currentRoute: Route & Pick<Unit, 'type' | 'routeDirection'>;
        stops: StrapiStop[];
        vehicleStops: StrapiStop['attributes']['stopId'][];
        stopVehicles: Pick<StopInfoItem, 'route' | 'type' | 'routeDirection'>[];
        stopInfo: StopInfoItem[];
    };
}

export type CurrentVehiclePayload = State['publicTransport']['currentVehicle'];
export interface CurrentVehicleOptions {
    shouldClear?: boolean;
}
export type CurrentVehiclePayloadWithOptions = CurrentVehiclePayload & CurrentVehicleOptions;
export interface SetCurrentVehiclePayload extends CurrentVehicleOptions {
    currentVehicle: CurrentVehiclePayload;
    currentRoute: State['publicTransport']['currentRoute'];
}
export type CurrentStopPayload = State['publicTransport']['currentStop'];
export interface CurrentStopOptions {
    shouldClear?: boolean;
}
export interface CurrentStopPayloadWithOptions extends CurrentStopOptions {
    currentStop: CurrentStopPayload;
}
export interface SetCurrentStopPayload extends CurrentStopOptions {
    currentStop: CurrentStopPayload;
    stopInfo: State['publicTransport']['stopInfo'];
}
export type SetStopsPayload = State['publicTransport']['stops'];
