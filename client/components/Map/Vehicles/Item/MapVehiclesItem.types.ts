import { ClientUnit } from 'transport-common/types/masstrans';

export type MapVehiclesItemProps = {
    boardId: number;
    velocity: number;
    position: [number, number];
    routeNumber: string | null;
    course: number;
    type: ClientUnit;
    accessibility?: boolean;
    warning?: boolean;
    stateNum: string;
    model: string;
    firstStation: string;
    lastStation: string;
    depoTitle: string;
    onClick: (routeNumber: string) => void;
    map: L.Map;
};

export type MoveInDirectionParams = {
    direction: number;
    vehicle: HTMLElement;
    velocity: number;
    scale: number;
};
