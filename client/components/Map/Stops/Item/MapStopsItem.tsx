import React, { useMemo } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import { ClientUnit, StopType } from 'transport-common/types/masstrans';

import { store } from 'state';
import { sidebarService } from 'services/sidebar/sidebar';
import { State } from 'common/types/state';
import { setCurrentStop } from 'state/features/public-transport';

import { MapStopsSidebar } from '../Sidebar/MapStopsSidebar';

import { STOP_ICON_BY_TYPE, TROLL_BUS_ICON_BY_TYPE } from './MapStopsItem.constants';
import { MapStopsItemProps } from './MapStopsItem.types';

import styles from './MapStopsItem.module.css';

const cn = classNames.bind(styles);

export function getIconObjectByTypes(stopType: StopType, vehicleType?: ClientUnit) {
    if (!vehicleType) {
        if (stopType !== StopType.TrollBus) {
            return STOP_ICON_BY_TYPE[stopType];
        }

        return TROLL_BUS_ICON_BY_TYPE[ClientUnit.Bus];
    }

    if (stopType !== StopType.TrollBus) {
        return STOP_ICON_BY_TYPE[vehicleType];
    }

    return TROLL_BUS_ICON_BY_TYPE[vehicleType];
}

export function MapStopsItem({ type, id, name, coords }: MapStopsItemProps) {
    const dispatch = useDispatch<typeof store.dispatch>();
    const currentStop = useSelector((state: State) => state.publicTransport.currentStop);
    const currentVehicleStops = useSelector((state: State) => state.publicTransport.vehicleStops);
    const currentVehicle = useSelector((state: State) => state.publicTransport.currentVehicle);

    const icon = useMemo(() => {
        const iconObject = getIconObjectByTypes(type, currentVehicle?.type);
        const isVehicleActive = Boolean(currentVehicleStops.length);

        if (isVehicleActive) {
            const isStopActive = currentVehicleStops.includes(id);

            if (isStopActive) {
                return iconObject.selected;
            }

            return iconObject.inactive;
        }

        const isActive = currentStop === id;
        const hasActiveStop = currentStop !== null;

        let icon = iconObject.idle;

        if (!isActive && hasActiveStop) {
            icon = iconObject.inactive;
        }

        return isActive
            ? new L.Icon({
                  ...icon.options,
                  iconSize: [48, 48],
                  className: cn(styles.MapStopsItemIcon, styles.MapStopsItemIconActive),
              })
            : icon;
    }, [currentStop, id, type, currentVehicleStops]);

    if (!coords) {
        return null;
    }

    return (
        <Marker
            position={coords}
            icon={icon}
            key={id}
            eventHandlers={{
                click() {
                    if (currentStop !== id) {
                        sidebarService.open({
                            component: <MapStopsSidebar type={type} name={name} id={id} />,
                            onClose: () => dispatch(setCurrentStop(null)),
                        });

                        dispatch(setCurrentStop(id));
                    }
                },
            }}
        />
    );
}
