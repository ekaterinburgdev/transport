import React from 'react';
import { Marker, Popup } from 'react-leaflet';

import { STATION_ICON_BY_TYPE } from './MapStationsItem.constants';
import { MapStationsItemProps } from './MapStationsItem.types';

export function MapStationsItem(props: MapStationsItemProps) {
    const {
        type, id, name, direction, lat, lng,
    } = props;

    if (!lng || !lat) {
        return null;
    }

    return lng && lat ? (
        <Marker position={[Number(lat), Number(lng)]} icon={STATION_ICON_BY_TYPE[type]} key={id}>
            <Popup pane="popupPane">
                <p>{name}</p>
                <p>{direction}</p>
            </Popup>
        </Marker>
    ) : null;
}
