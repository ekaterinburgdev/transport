import { useEffect, useRef, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import { COORDS_EKATERINBURG } from 'common/constants/coords';
import { MovingMarker } from 'components/leaflet-extensions/moving-marker';

const userIcon = new L.Icon({
    iconSize: [36, 36],
    iconAnchor: [36, 18],
    iconUrl: '/icons/user-placemark.svg',
});

const userIconWithText = new L.Icon({
    iconSize: [58, 54],
    iconAnchor: [36, 27],
    iconUrl: '/icons/user-placemark-with-text.svg',
});

export function MapLocation() {
    const userMarkerRef = useRef<MovingMarker>();
    const [isFirstFound, setIsFirstFound] = useState<boolean>(true);
    const [moveToLatLng, setMoveToLatLng] = useState<L.LatLng | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [cancelMove, setCancelMove] = useState<boolean>(false);

    const query = new URL(window.location.href).searchParams;

    const map = useMapEvents({
        locationfound(e) {
            if (isFirstFound) {
                userMarkerRef.current.setLatLng(e.latlng);
                map.setView(e.latlng, map.getZoom());
                setIsFirstFound(false);

                return;
            }

            if (isDragging) {
                setMoveToLatLng(e.latlng);
            } else {
                userMarkerRef.current.moveToWithDuration({
                    latlng: e.latlng,
                    duration: Number(query.get('dur')) || 800,
                });

                setCancelMove(true);
            }
        },
        locationerror(e) {
            console.error(e);

            if (isFirstFound) {
                map.setView(new L.LatLng(...COORDS_EKATERINBURG), map.getZoom());
                setIsFirstFound(false);
            }
        },
        movestart() {
            if (cancelMove) {
                userMarkerRef.current.cancelMove();

                setCancelMove(false);
            }

            setIsDragging(true);
        },
        moveend() {
            setIsDragging(false);

            if (moveToLatLng) {
                userMarkerRef.current.moveToWithDuration({
                    latlng: moveToLatLng,
                    duration: Number(query.get('dur')) || 800,
                });

                setMoveToLatLng(null);
            }
        },
    });

    useEffect(() => {
        map.locate({ watch: true });

        const icon = query.get('with-text') ? userIconWithText : userIcon;
        userMarkerRef.current = new MovingMarker(COORDS_EKATERINBURG, {
            icon,
        }).addTo(map);

        return () => {
            map.stopLocate();
        };
    }, [map]);

    return null;
}
