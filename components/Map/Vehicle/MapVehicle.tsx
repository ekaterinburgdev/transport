import { useMemo, FC } from 'react';

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import classNames from "classnames/bind";

import styles from "./MapVehicle.module.css";

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
}: MapVehicleProps) => {
    const isCourseEast = Math.abs(course - 45) <= 45;

    const icon = useMemo(() => new L.DivIcon({
        iconSize: [32, 37],
        iconAnchor: [16, 18],
        popupAnchor: [0, -18],
        className: `vehicle-${boardId}`,
        html: `
            <div class=${cn(styles.MapVehicle)}>
                <div
                    style="color: ${color}; ${isCourseEast ? leftRoutePanelStyle : ''}"
                    class="${cn(styles.MapVehicleRoute)}"
                >
                    ${routeNumber}
                </div>
                <img
                    style="transform: rotate(${course + 90}deg); transform-origin: 16px 21px"
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

    return (
        <Marker
            icon={icon}
            position={position}
            eventHandlers={eventHandlers}
        >
            <Popup>
                {routeNumber && <p>Маршрут: {routeNumber}</p>}
            </Popup>
        </Marker>
    );
};