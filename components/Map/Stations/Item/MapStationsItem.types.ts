import { TStationType } from 'common/types/masstrans';

export type MapStationsItemProps = {
    lat: number | null;
    lng: number | null;
    type: TStationType;
    id: string;
    name: string;
    direction: string;
};
