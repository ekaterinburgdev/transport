import React, { useEffect, useState } from 'react';
import { Pane, useMapEvent } from 'react-leaflet';
import { useDispatch } from 'react-redux';

import { ClientUnit, Unit } from 'transport-common/types/masstrans';

import { massTransApi } from 'api/masstrans/masstrans';
import { sidebarService } from 'services/sidebar/sidebar';
import { clearCurrent } from 'state/features/public-transport';
import { MapRoutes } from 'components/Map/Routes/MapRoutes';
import { MapStops } from 'components/Map/Stops/MapStops';
import { MapVehicles } from 'components/Map/Vehicles/MapVehicles';

export function MapTransport() {
    const dispatch = useDispatch();
    const [trolls, setTrolls] = useState<Unit[]>([]);
    const [trams, setTrams] = useState<Unit[]>([]);
    const [buses, setBuses] = useState<Unit[]>([]);

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

    return (
        <>
            {/* Render vehicles */}
            <Pane name="vehicles" style={{ zIndex: 550 }}>
                <MapVehicles vehicles={trolls} type={ClientUnit.Troll} />
                <MapVehicles vehicles={trams} type={ClientUnit.Tram} />
                <MapVehicles vehicles={buses} type={ClientUnit.Bus} />
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
