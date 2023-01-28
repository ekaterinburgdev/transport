import L from 'leaflet';

export enum UserPlacemarkControlState {
    Free = 'free',
    Centered = 'centered',
}

export type UserPlacemarkControlOptions = L.ControlOptions & {
    onClickHandler: () => void;
};
