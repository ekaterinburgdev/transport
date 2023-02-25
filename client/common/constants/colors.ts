import { VehicleType } from 'common/types/masstrans';

const getColorFromCss = (name: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(`--${name}`);

export const TRAM_COLOR = getColorFromCss('tram') || '#FF640F';
export const TRAM_TRANSLUCENT_COLOR = getColorFromCss('tram-translucent') || '#ED9F74';
export const TROLL_COLOR = getColorFromCss('troll') || '#00B4FF';
export const TROLL_TRANSLUCENT_COLOR = getColorFromCss('troll-translucent') || '#FF640F';
export const BUS_COLOR = getColorFromCss('bus') || '#00B400';
export const BUS_TRANSLUCENT_COLOR = getColorFromCss('bus-translucent') || '#80D9FF';

export const VEHICLE_TYPE_COLORS = {
    [VehicleType.Tram]: TRAM_COLOR,
    [VehicleType.Troll]: TROLL_COLOR,
    [VehicleType.Bus]: BUS_COLOR,
};

export const VEHICLE_TYPE_TRANSLUCENT_COLORS = {
    [VehicleType.Tram]: TRAM_TRANSLUCENT_COLOR,
    [VehicleType.Troll]: TROLL_TRANSLUCENT_COLOR,
    [VehicleType.Bus]: BUS_TRANSLUCENT_COLOR,
};
