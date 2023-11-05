import { ClientUnit, Route, StopInfoItem, Unit } from 'transport-common/types/masstrans';
import { StrapiStop } from 'transport-common/types/strapi';

export interface State {
    publicTransport: {
        currentVehicle: Pick<Unit, 'num' | 'routeId' | 'routeDirection' | 'type'> | null;
        currentStop: string | null;
        currentRoute: Route & Pick<Unit, 'type' | 'routeDirection'> & CurrentRouteOptions;
        stops: StrapiStop[];
        vehicleStops: StrapiStop['attributes']['stopId'][];
        stopVehicles: Pick<StopInfoItem, 'route' | 'type' | 'routeDirection'>[];
        stopInfo: StopInfoItem[];
        units: Record<ClientUnit, Unit[]>;
    };
}

export type CurrentVehiclePayload = State['publicTransport']['currentVehicle'];
export interface CurrentVehicleOptions {
    shouldClear?: boolean;
    shouldFlyTo?: boolean;
}
export type CurrentVehiclePayloadWithOptions = CurrentVehiclePayload & CurrentVehicleOptions;
export interface CurrentRouteOptions {
    shouldFlyTo?: boolean;
}
export interface SetCurrentVehiclePayload extends CurrentVehicleOptions {
    currentVehicle: CurrentVehiclePayload;
    currentRoute: State['publicTransport']['currentRoute'] & CurrentRouteOptions;
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

export type SetUnitsPayload =
    State['publicTransport']['units'][keyof State['publicTransport']['units']];
