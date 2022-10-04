import { useContext, useMemo } from 'react';
import { Polyline } from 'react-leaflet';

import { RoutesContext, VehicleType } from "../Transport/MapTransport";

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
        
    });

    return (
        <Polyline
            positions={routePositions}
            pathOptions={{
                color: typeColorMap[type],
                stroke: 8,
            }}
        />
    );
};