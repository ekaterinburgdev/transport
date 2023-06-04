import React, { useCallback, useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import { Unit, ClientUnit } from 'transport-common/types/masstrans';

import { MapVehiclesItem } from './Item/MapVehiclesItem';
import { VISISBILITY_MINIMAL_ZOOM } from './MapVehicles.constants';
import { useSelector } from 'react-redux';
import { State } from 'common/types/state';

export type MapVehiclesProps = {
    vehicles: Unit[];
    type: ClientUnit;
};

export function MapVehicles({ vehicles, type }: MapVehiclesProps) {
    const [hidden, setHidden] = useState(false);
    const [bounds, setBounds] = useState<L.LatLngBounds>(null);
    const currentVehicle = useSelector((state: State) => state.publicTransport.currentVehicle);
    const currentStopVehicles = useSelector((state: State) => state.publicTransport.stopVehicles);
    const currentStop = useSelector((state: State) => state.publicTransport.currentStop);

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

    const filterVehicles = useCallback(
        (vehicle: Unit) => {
            if (!bounds?.contains(vehicle.coords)) {
                return false;
            }

            const isStopActive = currentStop || Boolean(currentStopVehicles.length);

            if (isStopActive) {
                return currentStopVehicles.some(
                    (stopVehicle) =>
                        stopVehicle.route === vehicle.num &&
                        stopVehicle.type === vehicle.type &&
                        stopVehicle.routeDirection === vehicle.routeDirection,
                );
            }

            if (!currentVehicle) {
                return true;
            }

            return currentVehicle.num === vehicle.num && currentVehicle.type === vehicle.type;
        },
        [currentStopVehicles, currentVehicle, currentStop, bounds],
    );

    return !hidden && bounds && vehicles ? (
        <>
            {vehicles.filter(filterVehicles).map((vehicle) => (
                <MapVehiclesItem
                    {...vehicle}
                    type={type}
                    key={`${type}-${vehicle.id}-${vehicle.num}`}
                />
            ))}
        </>
    ) : null;
}
