import { useMemo } from 'react';

import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-rotatedmarker';
import classNames from "classnames/bind";

import styles from "./MapVehicle.module.css";

const cn = classNames.bind(styles);

export type MapVehicleProps = {
    iconUrl: string;
    boardId: number;
    velocity: number;
    position: number[];
    routeNumber: number | null;
    course: number;
    onClick: (routeNumber: number) => void;
}

export const MapVehicle = ({ iconUrl, boardId, velocity, position, routeNumber, onClick, course }: MapVehicleProps) => {
    const icon = useMemo(() => new L.Icon({
        iconSize: [32, 37],
        iconAnchor: [16, 18],
        popupAnchor: [0, -18],
        iconUrl,
        className: `vehicle-${boardId} ${cn(styles.MapVehicle)}`
    }));

    const eventHandlers = useMemo(() => ({
        click(e) {
            if (!routeNumber) {
                return;
            }

            onClick(routeNumber);
        },
    }));

    return (
        <Marker
            icon={icon}
            position={position}
            eventHandlers={eventHandlers}
            rotationAngle={course - 90}
            rotationOrigin="center center"
        >
            <Popup>
                {routeNumber && <p>Маршрут: {routeNumber}</p>}
            </Popup>
        </Marker>
    );
};