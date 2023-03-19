import { StopType } from 'transport-common/types/masstrans';

export type MapStationsItemProps = {
    coords: [number, number];
    type: StopType;
    id: string;
    name: string;
};
