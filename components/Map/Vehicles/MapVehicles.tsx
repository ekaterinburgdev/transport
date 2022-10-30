import React, { useState } from 'react';
import { useMapEvent } from 'react-leaflet';

import { VehicleType } from 'common/types/masstrans';
import { VEHICLE_TYPE_COLORS } from 'common/constants/colors';

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
                    arrowUrl={`/icons/${type}-arrow.svg`}
                    iconUrl={`/icons/${type}-light.svg`}
                    course={Number(vehicle.COURSE)}
                    key={vehicle.BOARD_ID}
                    color={VEHICLE_TYPE_COLORS[type]}
                    onClick={onClick}
                />
            ))}
        </>
    ) : null;
}
