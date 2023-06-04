import React, { useMemo, useState } from 'react';
import { Polyline, useMapEvent } from 'react-leaflet';
import { useSelector } from 'react-redux';

import { ClientUnit, Route } from 'transport-common/types/masstrans';

import { VEHICLE_TYPE_COLORS } from 'common/constants/colors';
import { State } from 'common/types/state';

import { VISISBILITY_MINIMAL_ZOOM } from './MapRoutes.constants';

export type MapRoutesProps = Route & {
    type: ClientUnit;
    routeDirection: string;
};

export function MapRoutes() {
    const [hidden, setHidden] = useState(false);
    const currentRoute = useSelector((state: State) => state.publicTransport.currentRoute);

    const map = useMapEvent('zoomend', () => {
        const zoom = map.getZoom();

        if (zoom < VISISBILITY_MINIMAL_ZOOM) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const routePositions = useMemo(() => {
        if (!currentRoute) {
            return null;
        }

        const currentRouteInDirection = currentRoute.races.find(
            (race) => race.raceType === currentRoute.routeDirection,
        );

        return currentRouteInDirection?.coordsList;
    }, [currentRoute?.races, currentRoute?.routeDirection]);

    return !hidden && routePositions ? (
        <Polyline
            positions={routePositions}
            pathOptions={{
                color: currentRoute.type ? VEHICLE_TYPE_COLORS[currentRoute.type] : undefined,
                weight: 6,
            }}
        />
    ) : null;
}
