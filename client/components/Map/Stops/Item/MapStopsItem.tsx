import React, { useState } from 'react';
import L from 'leaflet';
import { Marker, useMap, useMapEvent } from 'react-leaflet';
import classNames from 'classnames/bind';

import { sidebarService } from 'services/sidebar/sidebar';

import { MapStopsSidebar } from '../Sidebar/MapStopsSidebar';

import { STATION_ICON_BY_TYPE } from './MapStopsItem.constants';
import { MapStopsItemProps } from './MapStopsItem.types';

import styles from './MapStopsItem.module.css';

const cn = classNames.bind(styles);

export function MapStopsItem(props: MapStopsItemProps) {
    const { type, id, name, coords } = props;

    const map = useMap();

    const [isActive, setIsActive] = useState(false);
    const icon = isActive
        ? new L.Icon({
              ...STATION_ICON_BY_TYPE[type].options,
              iconSize: [48, 48],
              className: cn(styles.MapStopsItemIcon, styles.MapStopsItemIconActive),
          })
        : STATION_ICON_BY_TYPE[type];

    useMapEvent('click', () => {
        setIsActive(false);
        sidebarService.close();
    });

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
                    map?.fireEvent?.('click');
                    if (!isActive) {
                        sidebarService.open(
                            <MapStopsSidebar type={type} name={name} id={id} />,
                            () => {
                                setIsActive(false);
                            },
                        );
                        setIsActive(true);
                    }
                },
            }}
        />
    );
}
