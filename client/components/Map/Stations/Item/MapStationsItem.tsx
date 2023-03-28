import React, { useState } from 'react';
import L from 'leaflet';
import { Marker, useMap, useMapEvent } from 'react-leaflet';
import classNames from 'classnames/bind';

import { sidebarService } from 'services/sidebar/sidebar';

import { MapStationsSidebar } from '../Sidebar/MapStationsSidebar';

import { STATION_ICON_BY_TYPE } from './MapStationsItem.constants';
import { MapStationsItemProps } from './MapStationsItem.types';

import styles from './MapStationsItem.module.css';

const cn = classNames.bind(styles);

export function MapStationsItem(props: MapStationsItemProps) {
    const { type, id, name, coords } = props;

    const map = useMap();

    const [isActive, setIsActive] = useState(false);
    const icon = isActive
        ? new L.Icon({
              ...STATION_ICON_BY_TYPE[type].options,
              iconSize: [48, 48],
              className: cn(styles.MapStationsItemIcon, styles.MapStationsItemIconActive),
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
                        sidebarService.open(<MapStationsSidebar type={type} name={name} />, () => {
                            setIsActive(false);
                        });
                        setIsActive(true);
                    }
                },
            }}
        />
    );
}
