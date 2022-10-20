import React, { useEffect, useState, createContext, useCallback, memo } from 'react';
import { Pane } from 'react-leaflet';
import groupBy from 'lodash/groupBy';

import { MapRoutes } from '../Routes/MapRoutes';
import { MapStations } from '../Stations/MapStations';
import { MapVehicles } from '../Vehicles/MapVehicles';

export enum VehicleType {
    Tram = 'tram',
    Troll = 'troll',
};

export function getWrappedLink(link: string) {
    return `https://allorigins.hexlet.app/raw?disableCache=true&url=${encodeURIComponent(link)}`;
}

async function loadTransport(vehicle: VehicleType) {
    try {
        const res = await fetch(getWrappedLink(`http://map.ettu.ru/api/v2/${vehicle}/boards/?apiKey=111&order=1`));

        const resJson = await res.json();

        if (resJson.error.code) {
            console.error(resJson.error.msg);

            return [];
        }

        return resJson.vehicles;
    } catch (e) {
        console.error(e);

        return [];
    }
}

async function loadRoutes(vehicle: VehicleType) {
    try {
        const res = await fetch(getWrappedLink(`http://map.ettu.ru/api/v2/${vehicle}/routes/?apiKey=111`));

        const resJson = await res.json();

        if (resJson.error.code) {
            console.error(resJson.error.msg);

            return [];
        }

        return resJson.routes;
    } catch (e) {
        console.error(e);

        return [];
    }
}

async function loadStations(vehicle: VehicleType) {
    try {
        const res = await fetch(getWrappedLink(`http://map.ettu.ru/api/v2/${vehicle}/stations/?apiKey=111&order=1`));

        const resJson = await res.json();

        if (resJson.error.code) {
            console.error(resJson.error.msg);

            return [];
        }

        return resJson.points;
    } catch (e) {
        console.error(e);

        return [];
    }
}

async function loadPoints(vehicle: VehicleType) {
    try {
        const res = await fetch(getWrappedLink(`http://map.ettu.ru/api/v2/${vehicle}/points/?apiKey=111&order=1`));

        const resJson = await res.json();

        if (resJson.error.code) {
            console.error(resJson.error.msg);

            return [];
        }

        return resJson.points;
    } catch (e) {
        console.error(e);

        return [];
    }
}

const routesDefault = {
    tramsRoutes: {},
    tramsStations: {},
    tramsPoints: {},
    trollsRoutes: {},
    trollsStations: {},
    trollsPoints: {},
};

export const RoutesContext = createContext(routesDefault);

export const MapTransport = () => {
    const [trolls, setTrolls] = useState([]);
    const [trams, setTrams] = useState([]);

    const [tramsRoutes, setTramsRoutes] = useState({});
    const [trollsRoutes, setTrollsRoutes] = useState({});

    const [tramsStations, setTramsStations] = useState({});
    const [trollsStations, setTrollsStations] = useState({});

    const [tramsPoints, setTramsPoints] = useState({});
    const [trollsPoints, setTrollsPoints] = useState({});

    const [showTramsRoute, setShowTramsRoute] = useState<number | null>(null);
    const [showTrollsRoute, setShowTrollsRoute] = useState<number | null>(null);

    const updateTransport = async () => {
        const [trams, trolls] = await Promise.all([loadTransport(VehicleType.Tram), loadTransport(VehicleType.Troll)]);

        setTrolls(trolls.filter(troll => Boolean(troll.ROUTE) && Number(troll.ON_ROUTE)));
        setTrams(trams.filter(tram => Boolean(tram.ROUTE) && Number(tram.ON_ROUTE)));
    };

    const updateRoutes = async () => {
        const [trams, trolls] = await Promise.all([loadRoutes(VehicleType.Tram), loadRoutes(VehicleType.Troll)]);

        setTramsRoutes(groupBy(trams, 'num'));
        setTrollsRoutes(groupBy(trolls, 'num'));
    };

    const updateStations = async () => {
        const [trams, trolls] = await Promise.all([loadStations(VehicleType.Tram), loadStations(VehicleType.Troll)]);

        setTrollsStations(groupBy(trolls, 'ID'));
        setTramsStations(groupBy(trams, 'ID'));
    };

    const updatePoints = async () => {
        const [trams, trolls] = await Promise.all([loadPoints(VehicleType.Tram), loadPoints(VehicleType.Troll)]);

        setTrollsPoints(groupBy(trolls, 'ID'));
        setTramsPoints(groupBy(trams, 'ID'));
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

    return (
        <RoutesContext.Provider
            value={{
                tramsRoutes,
                tramsStations,
                tramsPoints,
                trollsRoutes,
                trollsStations,
                trollsPoints,
            }}
        >
            {/* Render vehicles */}
            <Pane name="vehicles" style={{ zIndex: 550 }}>
                <MapVehicles
                    vehicles={trolls}
                    type={VehicleType.Troll}
                    onClick={onTrollClick}
                />
                <MapVehicles
                    vehicles={trams}
                    type={VehicleType.Tram}
                    onClick={onTramClick}
                />
            </Pane>

            {/* Render selected route */}
            {showTramsRoute && <MapRoutes routeNumber={showTramsRoute} type={VehicleType.Tram} />}
            {showTrollsRoute && <MapRoutes routeNumber={showTrollsRoute} type={VehicleType.Troll} />}

            {/* Render stations */}
            <Pane name="stations" style={{ zIndex: 500 }}>
                <MapStations />
            </Pane>
        </RoutesContext.Provider>
    );
};
