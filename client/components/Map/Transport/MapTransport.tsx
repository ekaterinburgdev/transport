import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Pane, useMapEvent } from 'react-leaflet';
import groupBy from 'lodash/groupBy';

import { ClientUnit } from 'transport-common/types/masstrans';

import { massTransApi } from 'api/masstrans/masstrans';

import { MapRoutes } from 'components/Map/Routes/MapRoutes';
import { MapStations } from 'components/Map/Stations/MapStations';
import { MapVehicles } from 'components/Map/Vehicles/MapVehicles';

import { RoutesContext } from './MapTransport.context';

export function MapTransport() {
    const [trolls, setTrolls] = useState([]);
    const [trams, setTrams] = useState([]);
    const [buses, setBuses] = useState([]);

    const [tramsRoutes, setTramsRoutes] = useState({});
    const [trollsRoutes, setTrollsRoutes] = useState({});

    const [stops, setStops] = useState([]);

    const [tramsPoints, setTramsPoints] = useState({});
    const [trollsPoints, setTrollsPoints] = useState({});

    const [showTramsRoute, setShowTramsRoute] = useState<string | null>(null);
    const [showTrollsRoute, setShowTrollsRoute] = useState<string | null>(null);

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

    const updateRoutes = async () => {
        const [tramsRes, trollsRes] = await Promise.all([
            massTransApi.getRoutes(ClientUnit.Tram),
            massTransApi.getRoutes(ClientUnit.Troll),
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
            massTransApi.getPoints(ClientUnit.Tram),
            massTransApi.getPoints(ClientUnit.Troll),
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

    const onTrollClick = useCallback((routeNumber: string) => {
        setShowTrollsRoute(routeNumber);
        setShowTramsRoute(null);
    }, []);

    const onTramClick = useCallback((routeNumber: string) => {
        setShowTramsRoute(routeNumber);
        setShowTrollsRoute(null);
    }, []);

    // Waits for task about new masstrans route API route
    const onBusClick = useCallback((routeNumber: string) => {
        setShowTrollsRoute(null);
        setShowTramsRoute(null);
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
                <MapVehicles vehicles={trolls} type={ClientUnit.Troll} onClick={onTrollClick} />
                <MapVehicles vehicles={trams} type={ClientUnit.Tram} onClick={onTramClick} />
                <MapVehicles vehicles={buses} type={ClientUnit.Bus} onClick={onBusClick} />
            </Pane>

            {/* Render selected route */}
            {showTramsRoute && <MapRoutes routeNumber={showTramsRoute} type={ClientUnit.Tram} />}
            {showTrollsRoute && <MapRoutes routeNumber={showTrollsRoute} type={ClientUnit.Troll} />}

            {/* Render stations */}
            <Pane name="stations" style={{ zIndex: 500 }}>
                <MapStations />
            </Pane>
        </RoutesContext.Provider>
    );
}
