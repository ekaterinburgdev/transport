import React, {
    useCallback, useEffect, useRef, useState,
} from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import { COORDS_EKATERINBURG } from 'common/constants/coords';
import { MovingMarker } from 'components/Map/leaflet-extensions/moving-marker';
import { MapUserPlacemarkControl } from 'components/Map/UserPlacemarkControl/MapUserPlacemarkControl';

import { USER_PLACEMARK_ANIMATION_DURATION, USER_ICON } from './MapLocation.constants';

export function MapLocation() {
    const userMarkerRef = useRef<MovingMarker>();
    const [isFirstFound, setIsFirstFound] = useState<boolean>(true);
    const [moveToLatLng, setMoveToLatLng] = useState<L.LatLng | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [cancelMove, setCancelMove] = useState<boolean>(false);

    const map = useMapEvents({
        locationfound(e) {
            if (isFirstFound) {
                userMarkerRef?.current?.setLatLng(e.latlng);
                map.setView(e.latlng, map.getZoom());
                setIsFirstFound(false);

                return;
            }

            if (isDragging) {
                setMoveToLatLng(e.latlng);
            } else {
                userMarkerRef?.current?.moveToWithDuration({
                    latlng: e.latlng,
                    duration: USER_PLACEMARK_ANIMATION_DURATION,
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
                userMarkerRef?.current?.cancelMove();

                setCancelMove(false);
            }

            setIsDragging(true);
        },
        moveend() {
            setIsDragging(false);

            if (moveToLatLng) {
                userMarkerRef?.current?.moveToWithDuration({
                    latlng: moveToLatLng,
                    duration: USER_PLACEMARK_ANIMATION_DURATION,
                });

                setMoveToLatLng(null);
            }
        },
    });

    const startLocate = useCallback(() => {
        map.locate({ watch: true, enableHighAccuracy: true });

        userMarkerRef.current = new MovingMarker(COORDS_EKATERINBURG, {
            icon: USER_ICON,
        }).addTo(map);
    }, [map]);

    const onClick = useCallback(() => {
        if (isFirstFound) {
            startLocate();
        }
    }, [isFirstFound, startLocate]);

    useEffect(() => {
        if (!isFirstFound) {
            startLocate();
        }

        return () => {
            map.stopLocate();
            userMarkerRef?.current?.remove();
        };
    }, [map, isFirstFound, startLocate]);

    return (
        <MapUserPlacemarkControl
            options={{ position: 'bottomright' }}
            userPlacemark={userMarkerRef.current}
            onClick={onClick}
        />
    );
}
