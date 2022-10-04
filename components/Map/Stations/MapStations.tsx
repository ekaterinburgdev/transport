import { useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import { RoutesContext } from "../Transport/MapTransport";

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

export const MapStations = () => {
    const routes = useContext(RoutesContext);

    return (
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
                    >
                        <Popup>
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
                    >
                        <Popup>
                            <p>{station.NAME}</p>
                            <p>{station.DIRECTION}</p>
                        </Popup>
                    </Marker>
                );
            })}
        </>
    );
};