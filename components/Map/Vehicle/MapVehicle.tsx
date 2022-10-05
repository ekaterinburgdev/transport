import { useMemo, FC, useRef, useEffect } from 'react';

import { Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import classNames from "classnames/bind";

import styles from "./MapVehicle.module.css";
import { useCallback } from 'react';

const cn = classNames.bind(styles);

export type MapVehicleProps = {
    iconUrl: string;
    arrowUrl: string;
    boardId: number;
    velocity: number;
    position: [number, number];
    routeNumber: number | null;
    course: number;
    color: string;
    onClick: (routeNumber: number) => void;
}

const leftRoutePanelStyle = 'left: -19px; text-align: left;';

export const MapVehicle: FC<MapVehicleProps> = ({
    iconUrl,
    arrowUrl,
    boardId,
    position,
    routeNumber,
    onClick,
    course,
    color,
    velocity,
}: MapVehicleProps) => {
    const markerRef = useRef<L.Marker>();
    const map = useMap();

    const scale = useMemo(() => {
        // Get the y,x dimensions of the map
        const { x, y } = map.getSize();

        // calculate the distance the one side of the map to the other using the haversine formula
        const maxMeters = map
            .containerPointToLatLng([0, y])
            .distanceTo(map.containerPointToLatLng([x, y]));

        // calculate how many meters each pixel represents
        return maxMeters / x ;
    }, [map]);

    const getDistanceInPixels = useCallback((seconds: number) => {
        const fixedVelocity = velocity;

        const velocityMetersPerSecond = fixedVelocity / 3.6;
        const velocityPixelsPerSecond = velocityMetersPerSecond / scale;

        return seconds * velocityPixelsPerSecond;
    }, [velocity, scale]);

    const isCourseEast = course > 315 || course < 45;

    const getDeltaCoords = useCallback(() => {
        const distance = getDistanceInPixels(9);
        const angleInRad = course * Math.PI / 180;

        return [Math.cos(angleInRad) * distance, Math.sin(angleInRad) * distance];
    }, [course, getDistanceInPixels]);

    const icon = useMemo(() => new L.DivIcon({
        iconSize: [37, 32],
        iconAnchor: [18.5, 16],
        popupAnchor: [0, -16],
        className: `${cn(styles.MapVehicle)}`,
        html: `
            <div
                class="vehicle-${boardId}-${routeNumber} ${cn(styles.MapVehicleWrapper)}"
                style="transform: translate(0px, 0px)"
            >
                <div
                    style="color: ${color}; ${isCourseEast ? leftRoutePanelStyle : ''}"
                    class="${cn(styles.MapVehicleRoute)}"
                >
                    ${routeNumber}
                </div>
                <img
                    style="transform: rotate(${course}deg); transform-origin: 16px 16px"
                    class="${cn(styles.MapVehicleArrow)}"
                    src="${arrowUrl}"
                />
                <img
                    class="${cn(styles.MapVehicleIcon)}"
                    src="${iconUrl}"
                />
            </div>
        `,
    }), [color, boardId, course, iconUrl, arrowUrl, routeNumber, isCourseEast]);

    const eventHandlers = useMemo(() => ({
        click(e) {
            if (!routeNumber) {
                return;
            }

            onClick(routeNumber);
        },
    }), [routeNumber, onClick]);

    const updateTranslate = useCallback(() => {
        const marker = document.querySelector(`.vehicle-${boardId}-${routeNumber}`) as HTMLDivElement;

        if (!marker) {
            return;
        }

        const [x, y] = getDeltaCoords();

        marker.style.transform = `translate(${x}px, ${y}px)`;
    }, [boardId, routeNumber, getDeltaCoords]);

    useEffect(() => {
        setTimeout(updateTranslate, 0);
    }, [updateTranslate]);

    useMapEvents({
        zoomend() {
            updateTranslate();
        },
        moveend() {
            updateTranslate();
        },
    });

    return (
        <Marker
            icon={icon}
            position={position}
            eventHandlers={eventHandlers}
            ref={markerRef}
        />
    );
};