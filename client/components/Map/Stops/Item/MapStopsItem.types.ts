import L from 'leaflet';

import { StopType } from 'transport-common/types/masstrans';

export interface MapStopsItemProps {
    coords: [number, number];
    type: StopType;
    id: string;
    name: string;
}

export interface IconObject {
    idle: L.Icon;
    inactive: L.Icon;
    selected: L.Icon;
}
