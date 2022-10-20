import React, { useEffect, useState } from 'react';
import { useMapEvents, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const yekaterinburg: [number, number] = [54.838011, 60.597465];

export const MapLocation = () => {
    const [position, setPosition] = useState<L.LatLng | null>(null);

    const map = useMapEvents({
        locationfound(e) {
            if (!position) {
                map.setView(e.latlng, map.getZoom());
            }

            setPosition(e.latlng);
        },
        locationerror(e) {
            console.error(e);
        }
    });

    useEffect(() => {
        map.locate({ watch: true, maxZoom: 16 });

        return () => {
            map.stopLocate();
        }
    }, []);

    return (
        <Marker position={position || yekaterinburg}>
            <Popup>Your location</Popup>
        </Marker>
    );
};
