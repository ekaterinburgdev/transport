import { useEffect, useState } from "react";
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import groupBy from 'lodash/groupBy';

export enum VehicleType {
    Tram = 'tram',
    Troll = 'troll',
};

export function getWrappedLink(link: string) {
    return `https://api.allorigins.win/raw?url=${link}`;
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

const iconTrollOptions = new L.Icon({
    iconUrl: '/icons/troll.svg',
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -26],
});

const iconTramOptions = new L.Icon({
    iconUrl: '/icons/tram.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

export const MapTransport = () => {
    const [trolls, setTrolls] = useState([]);
    const [trams, setTrams] = useState([]);
    const [tramsRoutes, setTramsRoutes] = useState([]);
    const [trollsRoutes, setTrollsRoutes] = useState([]);
    const [tramsStations, setTramsStations] = useState([]);
    const [trollsStations, setTrollsStations] = useState([]);

    const updateTransport = async () => {
        const [trams, trolls] = await Promise.all([loadTransport(VehicleType.Tram), loadTransport(VehicleType.Troll)]);

        setTrolls(trolls);
        setTrams(trams);
    };

    const updateRoutes = async () => {
        const [trams, trolls] = await Promise.all([loadRoutes(VehicleType.Tram), loadRoutes(VehicleType.Troll)]);

        setTramsRoutes(trams);
        setTrollsRoutes(trolls);
    }

    const updateStations = async () => {
        const [trams, trolls] = await Promise.all([loadStations(VehicleType.Tram), loadStations(VehicleType.Troll)]);

        setTrollsStations(groupBy(trolls, 'ID'));
        setTramsStations(groupBy(trams, 'ID'));
    }

    useEffect(() => {
        updateRoutes();
        updateTransport();
        updateStations();

        setInterval(async () => {
            updateTransport();
        }, 5000);
    }, []);
  
    return (
        <>
            {trolls.map((troll) => (
                <Marker
                    icon={iconTrollOptions}
                    position={[Number(troll.LAT), Number(troll.LON)]}
                >
                    <Popup>
                        {troll.ROUTE && <p>Маршрут: {troll.ROUTE}</p>}
                        <p>Бортовой номер: {troll.BOARD_NUM}</p>
                    </Popup>
                </Marker>
            ))}
            {trams.map((tram) => (
                <Marker
                    icon={iconTramOptions}
                    position={[Number(tram.LAT), Number(tram.LON)]}
                >
                    <Popup>
                        {tram.ROUTE && <p>Маршрут: {tram.ROUTE}</p>}
                        <p>Бортовой номер: {tram.BOARD_NUM}</p>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};
