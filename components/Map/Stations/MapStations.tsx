import React, { useContext, useState } from 'react';
import { Marker, Popup, useMapEvent } from 'react-leaflet';
import L from 'leaflet';

import { RoutesContext } from 'components/Map/Transport/MapTransport.context';

import { VISISBILITY_MINIMAL_ZOOM } from './MapStations.constants';

const iconTramOptions = new L.Icon({
    iconSize: [16, 16],
    iconAnchor: [8, 16],
    popupAnchor: [0, -16],
    iconUrl: '/icons/tram-station.svg',
});

const iconTrollOptions = new L.Icon({
    iconSize: [16, 16],
    iconAnchor: [8, 16],
    popupAnchor: [0, -16],
    iconUrl: '/icons/troll-station.svg',
});

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

                const lat = station?.LAT || station?.LATITUDE;
                const lng = station?.LON || station?.LONGITUDE;

                if (!lng || !lat) {
                    return null;
                }

                return (
                    <Marker
                        position={[Number(lat), Number(lng)]}
                        icon={iconTramOptions}
                        key={station.ID}
                    >
                        <Popup pane="popupPane">
                            <p>{station.NAME}</p>
                            <p>{station.DIRECTION}</p>
                        </Popup>
                    </Marker>
                );
            })}
            {Object.values(routes.trollsStations).map((stationArr: any) => {
                const station = stationArr[0];

                const lat = station.LAT || station.LATITUDE;
                const lng = station.LON || station.LONGITUDE;

                if (!lng || !lat) {
                    return null;
                }

                return (
                    <Marker
                        position={[Number(lat), Number(lng)]}
                        icon={iconTrollOptions}
                        key={station.ID}
                    >
                        <Popup pane="popupPane">
                            <p>{station.NAME}</p>
                            <p>{station.DIRECTION}</p>
                        </Popup>
                    </Marker>
                );
            })}
        </>
    ) : null;
}
