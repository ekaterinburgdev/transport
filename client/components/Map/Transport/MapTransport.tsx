import React, { useEffect } from 'react';
import { Pane, useMap, useMapEvent } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { ClientUnit } from 'transport-common/types/masstrans';

import { massTransApi } from 'api/masstrans/masstrans';
import { sidebarService } from 'services/sidebar/sidebar';
import { clearCurrent, setBuses, setTrams, setTrolls } from 'state/features/public-transport';
import { MapRoutes } from 'components/Map/Routes/MapRoutes';
import { MapStops } from 'components/Map/Stops/MapStops';
import { MapVehicles } from 'components/Map/Vehicles/MapVehicles';
import { State } from 'common/types/state';

export function MapTransport() {
    const dispatch = useDispatch();
    const map = useMap();

    const currentRoute = useSelector((state: State) => state.publicTransport.currentRoute);
    const currentVehicle = useSelector((state: State) => state.publicTransport.currentVehicle);

    const updateTransport = async () => {
        const [tramsRes, trollsRes, busesRes] = await Promise.all([
            massTransApi.getVehicles(ClientUnit.Tram),
            massTransApi.getVehicles(ClientUnit.Troll),
            massTransApi.getVehicles(ClientUnit.Bus),
        ]);

        trollsRes && dispatch(setTrolls(trollsRes));
        tramsRes && dispatch(setTrams(tramsRes));
        busesRes && dispatch(setBuses(busesRes));
    };

    useEffect(() => {
        updateTransport();

        setInterval(async () => {
            updateTransport();
        }, 30000);
    }, []);

    useMapEvent('click', () => {
        dispatch(clearCurrent());
        sidebarService.close();
    });

    useEffect(() => {
        if (!currentVehicle && !currentRoute) {
            return;
        }

        const { routeDirection } = currentVehicle;
        const { races, shouldFlyTo } = currentRoute;

        if (!shouldFlyTo) {
            return;
        }

        const race = races.find((race) => race.raceType === routeDirection);

        const bounds = race.stops.map((stop) => stop.coords);

        map.flyToBounds(bounds);
    }, [currentVehicle, currentRoute]);

    return (
        <>
            {/* Render vehicles */}
            <Pane name="vehicles" style={{ zIndex: 550 }}>
                <MapVehicles type={ClientUnit.Troll} />
                <MapVehicles type={ClientUnit.Tram} />
                <MapVehicles type={ClientUnit.Bus} />
            </Pane>

            {/* Render selected route */}
            <MapRoutes />

            {/* Render stops */}
            <Pane name="stops" style={{ zIndex: 500 }}>
                <MapStops />
            </Pane>
        </>
    );
}
