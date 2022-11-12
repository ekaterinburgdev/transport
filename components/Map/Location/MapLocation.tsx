import { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import { COORDS_EKATERINBURG } from 'common/constants/coords';

export function MapLocation() {
    const map = useMapEvents({
        locationfound(e) {
            map.setView(e.latlng, map.getZoom());
        },
        locationerror(e) {
            console.error(e);

            map.setView(new L.LatLng(...COORDS_EKATERINBURG), map.getZoom());
        },
    });

    useEffect(() => {
        map.locate({ maxZoom: 16 });

        return () => {
            map.stopLocate();
        };
    }, [map]);

    return null;
}
