import { VehicleType } from 'common/types/masstrans';

export type MapVehiclesItemProps = {
    boardId: number;
    velocity: number;
    position: [number, number];
    routeNumber: number | null;
    course: number;
    color: string;
    type: VehicleType;
    disability?: boolean;
    warning?: boolean;
    onClick: (routeNumber: number) => void;
    map: L.Map;
};

export type MoveInDirectionParams = {
    direction: number;
    vehicle: HTMLElement;
    velocity: number;
    scale: number;
};
