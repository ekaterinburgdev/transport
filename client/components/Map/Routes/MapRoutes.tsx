import React, { useContext, useMemo, useState } from 'react';
import { Polyline, useMapEvent } from 'react-leaflet';

import { ClientUnit } from 'transport-common/types/masstrans';
import { VEHICLE_TYPE_COLORS } from 'common/constants/colors';

import { RoutesContext } from 'components/Map/Transport/MapTransport.context';

import { VISISBILITY_MINIMAL_ZOOM } from './MapRoutes.constants';

export type MapRoutesProps = {
    routeNumber: string;
    type: ClientUnit;
};

export function MapRoutes({ routeNumber, type }: MapRoutesProps) {
    const routes = useContext(RoutesContext);
    const [hidden, setHidden] = useState(false);

    const map = useMapEvent('zoomend', () => {
        const zoom = map.getZoom();

        if (zoom < VISISBILITY_MINIMAL_ZOOM) {
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

        return route[0].elements.map((element) => {
            const stations = element.full_path;

            return stations
                .map((station) => {
                    const stationData = routes[`${type}sPoints`][station];

                    if (!stationData) {
                        return null;
                    }

                    const { LAT: lat, LON: lng } = stationData[0];

                    return [lat, lng];
                })
                .filter(Boolean);
        });
    }, [routeNumber, routes, type]);

    return !hidden ? (
        <Polyline
            positions={routePositions}
            pathOptions={{
                color: VEHICLE_TYPE_COLORS[type],
                weight: 6,
            }}
        />
    ) : null;
}
