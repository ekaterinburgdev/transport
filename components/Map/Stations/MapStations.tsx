import React, { useContext, useState } from 'react';
import { useMapEvent } from 'react-leaflet';

import { VehicleType } from 'common/types/masstrans';
import { RoutesContext } from 'components/Map/Transport/MapTransport.context';

import { MapStationsItem } from './Item/MapStationsItem';

import { VISISBILITY_MINIMAL_ZOOM } from './MapStations.constants';

export function MapStations() {
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

    return !hidden ? (
        <>
            {Object.values(routes.tramsStations).map((stationArr: any) => {
                const station = stationArr[0];

                return (
                    <MapStationsItem
                        lat={station?.LAT || station?.LATITUDE}
                        lng={station?.LON || station?.LONGITUDE}
                        type={VehicleType.Tram}
                        id={station.ID}
                        name={station.NAME}
                        direction={station.DIRECTION}
                        key={station.ID}
                    />
                );
            })}
            {Object.values(routes.trollsStations).map((stationArr: any) => {
                const station = stationArr[0];

                return (
                    <MapStationsItem
                        lat={station?.LAT || station?.LATITUDE}
                        lng={station?.LON || station?.LONGITUDE}
                        type={VehicleType.Troll}
                        id={station.ID}
                        name={station.NAME}
                        direction={station.DIRECTION}
                        key={station.ID}
                    />
                );
            })}
        </>
    ) : null;
}
