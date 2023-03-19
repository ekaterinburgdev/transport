import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Pane, useMapEvent } from 'react-leaflet';
import groupBy from 'lodash/groupBy';

import { VehicleType } from 'common/types/masstrans';
import { massTransApi } from 'api/masstrans/masstrans';

import { MapRoutes } from 'components/Map/Routes/MapRoutes';
import { MapStations } from 'components/Map/Stations/MapStations';
import { MapVehicles } from 'components/Map/Vehicles/MapVehicles';

import { RoutesContext } from './MapTransport.context';

export function MapTransport() {
    const [trolls, setTrolls] = useState([]);
    const [trams, setTrams] = useState([]);

    const [tramsRoutes, setTramsRoutes] = useState({});
    const [trollsRoutes, setTrollsRoutes] = useState({});

    const [stops, setStops] = useState([]);

    const [tramsPoints, setTramsPoints] = useState({});
    const [trollsPoints, setTrollsPoints] = useState({});

    const [showTramsRoute, setShowTramsRoute] = useState<number | null>(null);
    const [showTrollsRoute, setShowTrollsRoute] = useState<number | null>(null);

    const updateTransport = async () => {
        const [tramsRes, trollsRes] = await Promise.all([
            massTransApi.getVehicles(VehicleType.Tram),
            massTransApi.getVehicles(VehicleType.Troll),
        ]);

        setTrolls(trollsRes.filter((troll) => Boolean(troll.ROUTE) && Number(troll.ON_ROUTE)));
        setTrams(tramsRes.filter((tram) => Boolean(tram.ROUTE) && Number(tram.ON_ROUTE)));
    };

    const updateRoutes = async () => {
        const [tramsRes, trollsRes] = await Promise.all([
            massTransApi.getRoutes(VehicleType.Tram),
            massTransApi.getRoutes(VehicleType.Troll),
        ]);

        setTramsRoutes(groupBy(tramsRes, 'num'));
        setTrollsRoutes(groupBy(trollsRes, 'num'));
    };

    const updateStations = async () => {
        const stopsFromApi = (await massTransApi.getStops()) || [];

        setStops(stopsFromApi);
    };

    const updatePoints = async () => {
        const [tramsRes, trollsRes] = await Promise.all([
            massTransApi.getPoints(VehicleType.Tram),
            massTransApi.getPoints(VehicleType.Troll),
        ]);

        setTramsPoints(groupBy(tramsRes, 'ID'));
        setTrollsPoints(groupBy(trollsRes, 'ID'));
    };

    useEffect(() => {
        updateRoutes();
        updateTransport();
        updateStations();
        updatePoints();

        setInterval(async () => {
            updateTransport();
        }, 8000);
    }, []);

    const onTrollClick = useCallback((routeNumber: number) => {
        setShowTrollsRoute(routeNumber);
        setShowTramsRoute(null);
    }, []);

    const onTramClick = useCallback((routeNumber: number) => {
        setShowTramsRoute(routeNumber);
        setShowTrollsRoute(null);
    }, []);

    useMapEvent('click', () => {
        setShowTramsRoute(null);
        setShowTrollsRoute(null);
    });

    const routesContextValue = useMemo(
        () => ({
            tramsRoutes,
            tramsPoints,
            trollsRoutes,
            trollsPoints,
            stops,
        }),
        [tramsRoutes, tramsPoints, trollsRoutes, trollsPoints, stops],
    );

    return (
        <RoutesContext.Provider value={routesContextValue}>
            {/* Render vehicles */}
            <Pane name="vehicles" style={{ zIndex: 550 }}>
                <MapVehicles vehicles={trolls} type={VehicleType.Troll} onClick={onTrollClick} />
                <MapVehicles vehicles={trams} type={VehicleType.Tram} onClick={onTramClick} />
            </Pane>

            {/* Render selected route */}
            {showTramsRoute && <MapRoutes routeNumber={showTramsRoute} type={VehicleType.Tram} />}
            {showTrollsRoute && (
                <MapRoutes routeNumber={showTrollsRoute} type={VehicleType.Troll} />
            )}

            {/* Render stations */}
            <Pane name="stations" style={{ zIndex: 500 }}>
                <MapStations />
            </Pane>
        </RoutesContext.Provider>
    );
}
