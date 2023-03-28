import L from 'leaflet';
import classNames from 'classnames/bind';

import { StationType } from 'common/types/masstrans';

import styles from './MapStationsItem.module.css';

const cn = classNames.bind(styles);

const commonIconOptions: Pick<
    L.IconOptions,
    'iconSize' | 'iconAnchor' | 'popupAnchor' | 'className'
> = {
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -24],
    className: cn(styles.MapStationsItemIcon),
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
