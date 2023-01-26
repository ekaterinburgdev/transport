import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import classNames from 'classnames/bind';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import { sidebarService } from 'services/sidebar/sidebar';

import { COORDS_EKATERINBURG } from 'common/constants/coords';

import { MapLocation } from 'components/Map/Location/MapLocation';
import { MapTransport } from 'components/Map/Transport/MapTransport';
import { MapZoomControl } from 'components/Map/ZoomControl/MapZoomControl';
import { MapWelcomeMessage } from 'components/Map/WelcomeMessage/MapWelcomeMessage';

import styles from './MapMainContainer.module.css';
import 'leaflet/dist/leaflet.css';

const cn = classNames.bind(styles);

function MapMainContainer() {
    const position: [number, number] = COORDS_EKATERINBURG;

    const [sidebar, setSidebar] = useState<React.ReactElement>(null);

    useEffect(() => {
        (async function init() {
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: iconRetinaUrl.src,
                iconUrl: iconUrl.src,
                shadowUrl: shadowUrl.src,
            });
        }());
        sidebarService.setSidebar = setSidebar;
        sidebarService.open(<MapWelcomeMessage />);
    }, []);

    return (
        <MapContainer
            center={position}
            attributionControl={null}
            zoomControl={false}
            zoom={16}
            zoomDelta={0.6}
            zoomSnap={0.4}
            scrollWheelZoom
            doubleClickZoom={false}
            className={cn(styles.Map)}
        >
            <TileLayer url="https://tiles.ekaterinburg.io/styles/basic-white/{z}/{x}/{y}@2x.png" />

            <MapLocation />
            <MapZoomControl position="bottomright" />

            <MapTransport />

            {sidebar}
        </MapContainer>
    );
}

export default MapMainContainer;
