import React, { useMemo, useState } from 'react';
import { Polyline, useMapEvent } from 'react-leaflet';

import { ClientUnit, Route } from 'transport-common/types/masstrans';
import { VEHICLE_TYPE_COLORS } from 'common/constants/colors';

import { VISISBILITY_MINIMAL_ZOOM } from './MapRoutes.constants';

export type MapRoutesProps = Route & {
    type: ClientUnit;
    routeDirection: string;
};

export function MapRoutes({ races, type, routeDirection }: MapRoutesProps) {
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
        const route = races.find((race) => race.raceType === routeDirection);

        return route?.coordsList;
    }, [races, routeDirection, type]);

    return !hidden && routePositions ? (
        <Polyline
            positions={routePositions}
            pathOptions={{
                color: VEHICLE_TYPE_COLORS[type],
                weight: 6,
            }}
        />
    ) : null;
}
