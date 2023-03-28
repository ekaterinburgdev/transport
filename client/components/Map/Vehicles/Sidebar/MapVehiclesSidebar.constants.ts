import { VehicleType } from 'common/types/masstrans';

export const vehiclesName = {
    [VehicleType.Bus]: 'автобус',
    [VehicleType.Troll]: 'троллейбус',
    [VehicleType.Tram]: 'трамвай',
};

export const additionalHeader = {
    [VehicleType.Bus]: 'об автобусе',
    [VehicleType.Troll]: 'о троллейбусе',
    [VehicleType.Tram]: 'о трамвае',
};

export const SVERDLOVSK_REGION = '196';
