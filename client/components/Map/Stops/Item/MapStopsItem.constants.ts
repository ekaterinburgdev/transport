import L from 'leaflet';
import classNames from 'classnames/bind';

import { ClientUnit, StopType } from 'transport-common/types/masstrans';

import styles from './MapStopsItem.module.css';
import { IconObject } from './MapStopsItem.types';

const cn = classNames.bind(styles);

const commonIconOptions: Pick<
    L.IconOptions,
    'iconSize' | 'iconAnchor' | 'popupAnchor' | 'className'
> = {
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -24],
    className: cn(styles.MapStopsItemIcon),
};

const iconTramOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/tram-stop.svg',
});

const iconTrollOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/troll-stop.svg',
});

const iconBusOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/bus-stop.svg',
});

const iconTrollBusOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/troll-bus-stop.svg',
});

const iconBusTrollOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/bus-troll-stop.svg',
});

const iconTramInactiveOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/tram-stop-inactive.svg',
});

const iconTrollInactiveOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/troll-stop-inactive.svg',
});

const iconBusInactiveOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/bus-stop-inactive.svg',
});

const iconBusTrollInactiveOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/bus-troll-stop-inactive.svg',
});

const iconTramSelectedVehicleOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/tram-selected-vehicle-stop.svg',
});

const iconTrollSelectedVehicleOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/troll-selected-vehicle-stop.svg',
});

const iconBusSelectedVehicleOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/bus-selected-vehicle-stop.svg',
});

const iconTrollBusSelectedVehicleOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/troll-bus-selected-vehicle-stop.svg',
});

const iconBusTrollSelectedVehicleOptions = new L.Icon({
    ...commonIconOptions,
    iconUrl: '/icons/bus-troll-selected-vehicle-stop.svg',
});

export const STOP_ICON_BY_TYPE: Record<Exclude<StopType, StopType.TrollBus>, IconObject> = {
    [StopType.Tram]: {
        idle: iconTramOptions,
        inactive: iconTramInactiveOptions,
        selected: iconTramSelectedVehicleOptions,
    },
    [StopType.Troll]: {
        idle: iconTrollOptions,
        inactive: iconTrollInactiveOptions,
        selected: iconTrollSelectedVehicleOptions,
    },
    [StopType.Bus]: {
        idle: iconBusOptions,
        inactive: iconBusInactiveOptions,
        selected: iconBusSelectedVehicleOptions,
    },
} as const;

export const TROLL_BUS_ICON_BY_TYPE: Record<ClientUnit, IconObject> = {
    [ClientUnit.Troll]: {
        idle: iconTrollBusOptions,
        inactive: iconBusTrollInactiveOptions,
        selected: iconTrollBusSelectedVehicleOptions,
    },
    [ClientUnit.Bus]: {
        idle: iconBusTrollOptions,
        inactive: iconBusTrollInactiveOptions,
        selected: iconBusTrollSelectedVehicleOptions,
    },
    [ClientUnit.Tram]: {
        idle: iconTramOptions,
        inactive: iconTramInactiveOptions,
        selected: iconTramSelectedVehicleOptions,
    },
} as const;
