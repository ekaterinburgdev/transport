import L from 'leaflet';

import { StationType } from 'common/types/masstrans';

const commonIconOptions: Pick<L.IconOptions, 'iconSize' | 'iconAnchor' | 'popupAnchor'> = {
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
};

const iconTramOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/tram-station.svg',
});

const iconTrollOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/troll-station.svg',
});

const iconBusOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/bus-station.svg',
});

const iconTrollBusOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/troll-bus-station.svg',
});

export const STATION_ICON_BY_TYPE = {
    [StationType.Tram]: iconTramOptions,
    [StationType.Troll]: iconTrollOptions,
    [StationType.Bus]: iconBusOptions,
    [StationType.TrollBus]: iconTrollBusOptions,
};
