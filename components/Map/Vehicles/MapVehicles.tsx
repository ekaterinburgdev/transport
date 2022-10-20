import React, { FC, useState } from 'react';
import { useMapEvent } from 'react-leaflet';

import { VehicleType } from '../Transport/MapTransport';
import { MapVehiclesItem } from './Item/MapVehiclesItem';

export type MapVehiclesProps = {
    vehicles: any[];
    type: VehicleType;
    onClick: (routeNumber: number) => void;
}

export const colorsMap = {
    tram: '#EC6609',
    troll: '#0BBBEF',
}

export const MapVehicles: FC<MapVehiclesProps> = ({ vehicles, type, onClick }) => {
    const [hidden, setHidden] = useState(false);

    const map = useMapEvent('zoomend', () => {
        const zoom = map.getZoom();

        if (zoom < 13) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return !hidden ? (
        <>
            {vehicles.map(vehicle => (
                <MapVehiclesItem
                    type={type}
                    position={[Number(vehicle.LAT), Number(vehicle.LON)]}
                    routeNumber={Number(vehicle.ROUTE)}
                    velocity={Number(vehicle.VELOCITY)}
                    boardId={Number(vehicle.BOARD_ID)}
                    arrowUrl={`/icons/${type}-arrow.svg`}
                    iconUrl={`/icons/${type}-light.svg`}
                    course={Number(vehicle.COURSE)}
                    key={vehicle.BOARD_ID}
                    color={colorsMap[type]}
                    onClick={onClick}
                />
            ))}
        </>
    ) : null;
}