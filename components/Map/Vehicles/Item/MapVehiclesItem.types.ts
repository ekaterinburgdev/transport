export type MapVehiclesItemProps = {
    iconUrl: string;
    arrowUrl: string;
    boardId: number;
    velocity: number;
    position: [number, number];
    routeNumber: number | null;
    course: number;
    color: string;
    onClick: (routeNumber: number) => void;
    map: L.Map;
};

export type MoveInDirectionParams = {
    direction: number;
    vehicle: HTMLElement;
    velocity: number;
    scale: number;
};
