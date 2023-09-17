import React, { useMemo } from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import { store } from 'state';
import { sidebarService } from 'services/sidebar/sidebar';
import { State } from 'common/types/state';
import { setCurrentStop } from 'state/features/public-transport';

import { MapStopsSidebar } from '../Sidebar/MapStopsSidebar';

import { MapStopsItemProps } from './MapStopsItem.types';
import { getIconObjectByTypes } from './MapStopsItem.utils';

import styles from './MapStopsItem.module.css';

const cn = classNames.bind(styles);

export function MapStopsItem({ type, id, name, coords }: MapStopsItemProps) {
    const dispatch = useDispatch<typeof store.dispatch>();
    const currentStop = useSelector((state: State) => state.publicTransport.currentStop);
    const currentVehicleStops = useSelector((state: State) => state.publicTransport.vehicleStops);
    const currentVehicle = useSelector((state: State) => state.publicTransport.currentVehicle);

    const icon = useMemo(() => {
        const hasActiveStop = currentStop !== null;
        const isVehicleActive = Boolean(currentVehicleStops.length);

        if (isVehicleActive && !hasActiveStop) {
            const isStopActive = currentVehicleStops.includes(id);

            if (isStopActive) {
                const iconObject = getIconObjectByTypes(type, currentVehicle?.type);

                return new L.Icon({
                    ...iconObject.selected.options,
                    className: cn(styles.MapStopsItemIcon, styles.MapStopsItemIconSelected),
                });
            }

            const iconObject = getIconObjectByTypes(type);

            return iconObject.inactive;
        }

        const iconObject = getIconObjectByTypes(type);

        let icon = iconObject.idle;

        const isActive = currentStop === id;

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
                            component: <MapStopsSidebar type={type} name={name} />,
                            onClose: () => dispatch(setCurrentStop({ currentStop: null })),
                        });

                        dispatch(setCurrentStop({ currentStop: id }));
                    }
                },
            }}
        />
    );
}
