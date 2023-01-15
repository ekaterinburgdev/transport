import React, {
    useRef, useEffect, useMemo, useCallback, useState,
} from 'react';
import ReactDOMServer from 'react-dom/server';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import classNames from 'classnames/bind';

import { MovingMarker } from 'components/leaflet-extensions/moving-marker';

import { MapVehicleMarker } from '../Marker/MapVehicleMarker';

import { EAST_COURSE_RANGE } from './MapVehiclesItem.constants';
import { MapVehiclesItemProps } from './MapVehiclesItem.types';

import styles from './MapVehiclesItem.module.css';

const cn = classNames.bind(styles);

const geoCoordsToEuqlid = (oPoint: [number, number], point: [number, number]) => {
    const yPoint: [number, number] = [oPoint[0], point[1]];
    const xPoint: [number, number] = [point[0], oPoint[1]];

    let x = new L.LatLng(...xPoint).distanceTo(point);
    let y = new L.LatLng(...yPoint).distanceTo(point);

    if (point[0] < oPoint[0]) {
        x = -x;
    }

    if (point[1] < oPoint[1]) {
        y = -y;
    }

    return [x, y];
};

export function MapVehiclesItem({
    position,
    velocity,
    course,
    boardId,
    routeNumber,
    type,
    disability,
    warning,
    onClick,
}: MapVehiclesItemProps) {
    const map = useMap();
    const vehicleRef = useRef<MovingMarker>();
    const [isFirstPosition, setIsFirstPosition] = useState(true);
    const [isActive, setIsActive] = useState(false);

    const onClickEventHandler = useCallback(() => {
        setIsActive(true);
        onClick(routeNumber);
    }, [routeNumber, onClick]);

    const icon = useMemo(() => {
        const isCourseEast = course > EAST_COURSE_RANGE.left || course < EAST_COURSE_RANGE.right;

        return new L.DivIcon({
            iconSize: [33, 28],
            iconAnchor: [16.5, 14],
            popupAnchor: [0, -14],
            className: `${cn(styles.MapVehicle)}`,
            html: ReactDOMServer.renderToStaticMarkup(
                <MapVehicleMarker
                    boardId={boardId}
                    routeNumber={routeNumber}
                    type={type}
                    disability={disability}
                    warning={warning}
                    isCourseEast={isCourseEast}
                    course={course}
                />,
            ),
        });
    }, [course, boardId, routeNumber, type, disability, warning]);

    const rotateIcon = useCallback(() => {
        vehicleRef.current.setIcon(icon);
    }, [course, icon]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isNewPositionBehind = useCallback(() => {
        const prevPosition = vehicleRef.current.getLatLng();
        const newPosition = new L.LatLng(...position);
        const center: [number, number] = [prevPosition.lat, prevPosition.lng];
        const xPosition: [number, number] = [prevPosition.lat, prevPosition.lng + 0.01];

        const newPositionEuqlid = geoCoordsToEuqlid(center, position);
        const xPositionEuqlid = geoCoordsToEuqlid(center, xPosition);

        const newPositionDistance = prevPosition.distanceTo(newPosition);

        if (newPositionDistance > 150) {
            return false;
        }

        const xPositionDistance = prevPosition.distanceTo(xPosition);

        const xMult = newPositionEuqlid[0] * xPositionEuqlid[0];
        const yMult = newPositionEuqlid[1] * xPositionEuqlid[1];
        const scalarMult = xMult + yMult;
        const a = Math.acos(scalarMult / (xPositionDistance * newPositionDistance));
        const angle = (a * 180) / Math.PI;

        const diff = Math.abs(course - angle);

        return diff >= 160 && diff <= 200;
    }, [position, course]);

    const startVehicleMoving = useCallback(
        (isFirstMove: boolean) => {
            if (isActive) {
                // eslint-disable-next-line no-console
                console.log('start moving');
            }

            vehicleRef.current.moveToWithDuration({
                latlng: new L.LatLng(...position),
                duration: isFirstMove ? 0 : 2000,
                inertialMove: {
                    speed: velocity,
                    direction: course,
                    callback: course === 270 || velocity === 0 ? null : rotateIcon,
                },
            });
        },
        [position, velocity, course, rotateIcon],
    );

    useEffect(() => {
        vehicleRef.current?.cancelMove();
        const prevMap = vehicleRef.current ? vehicleRef.current.getMap() : null;

        if (prevMap !== map) {
            if (vehicleRef.current) {
                vehicleRef.current.addTo(map);
            } else {
                const vehicle = new MovingMarker(position, {
                    icon,
                }).addTo(map);

                vehicle.on('click', onClickEventHandler);
                vehicleRef.current = vehicle;
            }
        }

        startVehicleMoving(isFirstPosition);

        if (isFirstPosition) {
            setIsFirstPosition(false);
        }

        return () => {
            const prevMapCheck = vehicleRef.current ? vehicleRef.current.getMap() : null;

            if (prevMapCheck !== map) {
                vehicleRef.current.remove();
            }
        };
    }, [map, position, velocity, course]);

    return null;
}
