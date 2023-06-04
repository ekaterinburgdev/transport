import React, { useCallback, useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { State } from 'common/types/state';
import { setStops } from 'state/features/public-transport';
import { massTransApi } from 'api/masstrans/masstrans';

import { MapStopsItem } from './Item/MapStopsItem';
import { VISISBILITY_MINIMAL_ZOOM } from './MapStops.constants';

export function MapStops() {
    const dispatch = useDispatch();
    const stops = useSelector((state: State) => state.publicTransport.stops);
    const [hidden, setHidden] = useState(false);
    const [bounds, setBounds] = useState<L.LatLngBounds>(null);

    const map = useMapEvents({
        zoomend: () => {
            const zoom = map.getZoom();

            if (zoom < VISISBILITY_MINIMAL_ZOOM) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            setBounds(map.getBounds());
        },
        moveend: () => {
            setBounds(map.getBounds());
        },
    });

    const updateStops = useCallback(async () => {
        const stopsFromApi = (await massTransApi.getStops()) || [];

        dispatch(setStops(stopsFromApi));
    }, []);

    useEffect(() => {
        updateStops();
        setBounds(map.getBounds());
    }, []);

    return !hidden && bounds && stops ? (
        <>
            {stops.map((stop) =>
                bounds.contains(stop.attributes.coords) ? (
                    <MapStopsItem
                        key={stop.id}
                        coords={stop.attributes.coords}
                        type={stop.attributes.type}
                        id={stop.attributes.stopId}
                        name={stop.attributes.title}
                    />
                ) : null,
            )}
        </>
    ) : null;
}
