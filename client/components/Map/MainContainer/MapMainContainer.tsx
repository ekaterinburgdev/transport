import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import classNames from 'classnames/bind';

import { sidebarService } from 'services/sidebar/sidebar';

import { COORDS_EKATERINBURG } from 'common/constants/coords';

import { MapLocation } from 'components/Map/Location/MapLocation';
import { MapTransport } from 'components/Map/Transport/MapTransport';
import { MapZoomControl } from 'components/Map/ZoomControl/MapZoomControl';
import { MapWelcomeMessage } from 'components/Map/WelcomeMessage/MapWelcomeMessage';

import styles from './MapMainContainer.module.css';
import 'leaflet/dist/leaflet.css';

const cn = classNames.bind(styles);

function MapMainContainer({ zoom = 16, showControls = true }) {
    const position: [number, number] = COORDS_EKATERINBURG;

    const [sidebar, setSidebar] = useState<React.ReactElement>(null);

    useEffect(() => {
        sidebarService.setSidebar = setSidebar;

        try {
            const hasVisited = localStorage.getItem('hasVisited');

            if (!hasVisited) {
                sidebarService.open({ component: <MapWelcomeMessage /> });
                localStorage.setItem('hasVisited', '1');
            }
        } catch (e) {}
    }, []);

    return (
        <MapContainer
            center={position}
            attributionControl={null}
            zoomControl={false}
            zoom={zoom}
            zoomDelta={0.6}
            scrollWheelZoom
            doubleClickZoom={false}
            className={cn(styles.Map)}
        >
            <TileLayer url="https://tiles.ekaterinburg.io/styles/basic-white/{z}/{x}/{y}@2x.png" />

            {showControls && <>
                <MapLocation />
                <MapZoomControl position="bottomright" />
            </>}

            <MapTransport />

            {sidebar}
        </MapContainer>
    );
}

export default MapMainContainer;
