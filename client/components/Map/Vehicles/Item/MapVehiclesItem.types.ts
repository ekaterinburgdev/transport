import { ClientUnit, Unit } from 'transport-common/types/masstrans';

export type MapVehiclesItemProps = Unit & {
    type: ClientUnit;
    warning?: boolean;
    onClick: (routeId: number, routeDirection: string) => void;
    map: L.Map;
};

export type MoveInDirectionParams = {
    direction: number;
    vehicle: HTMLElement;
    velocity: number;
    scale: number;
};
