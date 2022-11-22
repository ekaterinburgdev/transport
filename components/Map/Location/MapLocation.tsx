import React, { useEffect, useRef, useState } from 'react';
import { useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';

import { COORDS_EKATERINBURG } from 'common/constants/coords';

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

function moveTo(map: L.Map, end: L.LatLng, duration: number, marker: L.Marker) {
    const endTime = performance.now() + duration;
    const startPoint = map.latLngToContainerPoint(marker.getLatLng());
    const endPoint = map.latLngToContainerPoint(end);
    let animId: number;

    const moveToAnim = () => {
        const timeRemains = endTime - performance.now();

        if (timeRemains <= 0) {
            marker.setLatLng(end);

            return;
        }

        const progress = (duration - timeRemains) / duration;

        const currentPos = endPoint.multiplyBy(progress).add(startPoint.multiplyBy(1 - progress));

        marker.setLatLng(map.containerPointToLatLng(currentPos));

        animId = L.Util.requestAnimFrame(moveToAnim);
    };

    moveToAnim();

    return () => L.Util.cancelAnimFrame(animId);
}

export function MapLocation() {
    const userMarkerRef = useRef<L.Marker>();
    const [isFirstFound, setIsFirstFound] = useState<boolean>(true);
    const [moveToLatLng, setMoveToLatLng] = useState<L.LatLng | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [cancelMove, setCancelMove] = useState<() => void | null>(null);

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
                const cancel = moveTo(
                    map,
                    e.latlng,
                    Number(query.get('dur')) || 800,
                    userMarkerRef.current,
                );

                setCancelMove(cancel);
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
                cancelMove();

                setCancelMove(null);
            }

            setIsDragging(true);
        },
        moveend() {
            setIsDragging(false);

            if (moveToLatLng) {
                moveTo(map, moveToLatLng, Number(query.get('dur')) || 800, userMarkerRef.current);

                setMoveToLatLng(null);
            }
        },
    });

    useEffect(() => {
        map.locate({ watch: true });

        return () => {
            map.stopLocate();
        };
    }, [map]);

    const icon = query.get('with-text') ? userIconWithText : userIcon;

    return <Marker icon={icon} position={COORDS_EKATERINBURG} ref={userMarkerRef} />;
}
