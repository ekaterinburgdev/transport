import { State } from 'common/types/state';
import { setCurrentVehicle } from 'state/features/public-transport';
import { ClientUnit, Unit } from 'transport-common/types/masstrans';

export type MapVehiclesItemProps = Unit & {
    type: ClientUnit;
    warning?: boolean;
    map: L.Map;
    currentVehicle: State['publicTransport']['currentVehicle'];
    setCurrentVehicle: typeof setCurrentVehicle;
};

export type MoveInDirectionParams = {
    direction: number;
    vehicle: HTMLElement;
    velocity: number;
    scale: number;
};
