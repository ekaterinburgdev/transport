import React, { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import { Unit, ClientUnit } from 'transport-common/types/masstrans';

import { MapVehiclesItem } from './Item/MapVehiclesItem';
import { VISISBILITY_MINIMAL_ZOOM } from './MapVehicles.constants';

export type MapVehiclesProps = {
    vehicles: Unit[];
    type: ClientUnit;
    onClick: (routeNumber: number, routeDirection: string) => void;
};

export function MapVehicles({ vehicles, type, onClick }: MapVehiclesProps) {
    const [hidden, setHidden] = useState(false);
    const [bounds, setBounds] = useState<L.LatLngBounds>(null);

    const map = useMapEvents({
        zoomend: () => {
            const zoom = map.getZoom();

            if (zoom < VISISBILITY_MINIMAL_ZOOM) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            setBounds(map.getBounds());
        },
        moveend: () => {
            setBounds(map.getBounds());
        },
    });

    useEffect(() => {
        setBounds(map.getBounds());
    }, []);

    return !hidden && bounds && vehicles ? (
        <>
            {vehicles.map((vehicle) =>
                bounds.contains(vehicle.coords) ? (
                    <MapVehiclesItem
                        {...vehicle}
                        type={type}
                        key={`${type}-${vehicle.id}`}
                        onClick={onClick}
                    />
                ) : null,
            )}
        </>
    ) : null;
}
