import React, { useContext, useMemo, useState } from 'react';
import { Polyline, useMapEvent } from 'react-leaflet';

import { RoutesContext, VehicleType } from '../Transport/MapTransport';

export type MapRoutesProps = {
    routeNumber: number;
    type: VehicleType;
};

const typeColorMap = {
    tram: '#EC6608',
    troll: '#0BBBEF',
};

export const MapRoutes = ({ routeNumber, type }: MapRoutesProps) => {
    const routes = useContext(RoutesContext);
    const [hidden, setHidden] = useState(false);

    const map = useMapEvent('zoomend', () => {
        const zoom = map.getZoom();

        if (zoom < 13) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const routePositions = useMemo(() => {
        const route = routes[`${type}sRoutes`]?.[routeNumber];

        if (!route) {
            return null;
        }

        return route[0].elements.map(element => {
            const stations = element.full_path;

            return stations.map(station => {
                const stationData = routes[`${type}sPoints`][station];
    
                if (!stationData) {
                    return null;
                }
    
                const { LAT: lat, LON: lng } = stationData[0];
    
                return [lat, lng];
            }).filter(Boolean);
        });
    }, [
        routeNumber,
        routes,
        type,
    ]);

    return !hidden ? (
        <Polyline
            positions={routePositions}
            pathOptions={{
                color: typeColorMap[type],
                weight: 6,
            }}
        />
    ) : null;
};