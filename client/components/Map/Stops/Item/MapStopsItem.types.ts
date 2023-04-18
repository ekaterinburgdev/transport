import { StopType } from 'transport-common/types/masstrans';

export type MapStopsItemProps = {
    coords: [number, number];
    type: StopType;
    id: string;
    name: string;
};
