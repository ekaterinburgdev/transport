import React, { useContext, useState } from 'react';
import { useMapEvent } from 'react-leaflet';

import { RoutesContext } from 'components/Map/Transport/MapTransport.context';

import { MapStationsItem } from './Item/MapStationsItem';

import { VISISBILITY_MINIMAL_ZOOM } from './MapStations.constants';

export function MapStations() {
    const { stops } = useContext(RoutesContext);
    const [hidden, setHidden] = useState(false);
    const map = useMapEvent('zoomend', () => {
        const zoom = map.getZoom();

        if (zoom < VISISBILITY_MINIMAL_ZOOM) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return !hidden ? (
        <>
            {stops.map((stop) => (
                <MapStationsItem
                    key={stop.id}
                    coords={stop.attributes.coords}
                    type={stop.attributes.type}
                    id={stop.attributes.stopId}
                    name={stop.attributes.title}
                />
            ))}
        </>
    ) : null;
}
