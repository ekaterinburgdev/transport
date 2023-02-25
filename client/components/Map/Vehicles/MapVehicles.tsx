import React, { useState } from 'react';
import { useMapEvent } from 'react-leaflet';

import { VehicleType } from 'common/types/masstrans';

import { MapVehiclesItem } from './Item/MapVehiclesItem';
import { VISISBILITY_MINIMAL_ZOOM } from './MapVehicles.constants';

export type MapVehiclesProps = {
    vehicles: any[];
    type: VehicleType;
    onClick: (routeNumber: number) => void;
};

export function MapVehicles({ vehicles, type, onClick }: MapVehiclesProps) {
    const [hidden, setHidden] = useState(false);

    const map = useMapEvent('zoomend', () => {
        const zoom = map.getZoom();

        if (zoom < VISISBILITY_MINIMAL_ZOOM) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return !hidden ? (
        <>
            {vehicles.map((vehicle) => (
                <MapVehiclesItem
                    position={[Number(vehicle.LAT), Number(vehicle.LON)]}
                    routeNumber={Number(vehicle.ROUTE)}
                    velocity={Number(vehicle.VELOCITY)}
                    boardId={Number(vehicle.BOARD_ID)}
                    type={type}
                    course={Number(vehicle.COURSE)}
                    key={vehicle.BOARD_ID}
                    onClick={onClick}
                />
            ))}
        </>
    ) : null;
}
