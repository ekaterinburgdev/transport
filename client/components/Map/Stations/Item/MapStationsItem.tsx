import React, { useState } from 'react';
import L from 'leaflet';
import { Marker, useMap, useMapEvent } from 'react-leaflet';

import { sidebarService } from 'services/sidebar/sidebar';

import { MapStationsSidebar } from '../Sidebar/MapStationsSidebar';

import { STATION_ICON_BY_TYPE } from './MapStationsItem.constants';
import { MapStationsItemProps } from './MapStationsItem.types';

export function MapStationsItem(props: MapStationsItemProps) {
    const { type, id, name, lat, lng } = props;

    const map = useMap();

    const [isActive, setIsActive] = useState(false);
    const icon = isActive
        ? new L.Icon({
              ...STATION_ICON_BY_TYPE[type].options,
              iconAnchor: [24, 48],
              iconSize: [48, 48],
          })
        : STATION_ICON_BY_TYPE[type];

    useMapEvent('click', () => {
        setIsActive(false);
        sidebarService.close();
    });

    if (!lng || !lat) {
        return null;
    }

    return lng && lat ? (
        <Marker
            position={[Number(lat), Number(lng)]}
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
    ) : null;
}
