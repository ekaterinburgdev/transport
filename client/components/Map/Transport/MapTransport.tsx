import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Pane, useMapEvent } from 'react-leaflet';

import { ClientUnit, Route, Unit } from 'transport-common/types/masstrans';

import { massTransApi } from 'api/masstrans/masstrans';

import { MapRoutes } from 'components/Map/Routes/MapRoutes';
import { MapStops } from 'components/Map/Stops/MapStops';
import { MapVehicles } from 'components/Map/Vehicles/MapVehicles';

import { RoutesContext } from './MapTransport.context';

export function MapTransport() {
    const [trolls, setTrolls] = useState<Unit[]>([]);
    const [trams, setTrams] = useState<Unit[]>([]);
    const [buses, setBuses] = useState<Unit[]>([]);
    const [activeRoute, setActiveRoute] = useState<
        Route & { type: ClientUnit; routeDirection: string }
    >(null);

    const [stops, setStops] = useState([]);

    const updateTransport = async () => {
        const [tramsRes, trollsRes, busesRes] = await Promise.all([
            massTransApi.getVehicles(ClientUnit.Tram),
            massTransApi.getVehicles(ClientUnit.Troll),
            massTransApi.getVehicles(ClientUnit.Bus),
        ]);

        trollsRes && setTrolls(trollsRes);
        tramsRes && setTrams(tramsRes);
        busesRes && setBuses(busesRes);
    };

    const updateStops = async () => {
        const stopsFromApi = (await massTransApi.getStops()) || [];

        setStops(stopsFromApi);
    };

    useEffect(() => {
        updateTransport();
        updateStops();

        setInterval(async () => {
            updateTransport();
        }, 30000);
    }, []);

    const onTransportClick = useCallback(
        (type: ClientUnit) => async (routeId: number, routeDirection: string) => {
            const route = await massTransApi.getRoute(routeId);

            if (route) {
                setActiveRoute({
                    ...route,
                    type,
                    routeDirection,
                });
            }
        },
        [],
    );

    useMapEvent('click', () => {
        setActiveRoute(null);
    });

    const routesContextValue = useMemo(
        () => ({
            stops,
        }),
        [stops],
    );

    return (
        <RoutesContext.Provider value={routesContextValue}>
            {/* Render vehicles */}
            <Pane name="vehicles" style={{ zIndex: 550 }}>
                <MapVehicles
                    vehicles={trolls}
                    type={ClientUnit.Troll}
                    onClick={onTransportClick(ClientUnit.Troll)}
                />
                <MapVehicles
                    vehicles={trams}
                    type={ClientUnit.Tram}
                    onClick={onTransportClick(ClientUnit.Tram)}
                />
                <MapVehicles
                    vehicles={buses}
                    type={ClientUnit.Bus}
                    onClick={onTransportClick(ClientUnit.Bus)}
                />
            </Pane>

            {/* Render selected route */}
            {activeRoute && <MapRoutes {...activeRoute} />}

            {/* Render stops */}
            <Pane name="stops" style={{ zIndex: 500 }}>
                <MapStops />
            </Pane>
        </RoutesContext.Provider>
    );
}
