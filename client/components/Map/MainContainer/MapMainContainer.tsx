import React, { useEffect, useState } from 'react';
import { MapContainer, Pane, TileLayer } from 'react-leaflet';
import classNames from 'classnames/bind';
import sidebarStyles from 'styles/leaflet-sidebar.module.css';

import { sidebarService } from 'services/sidebar/sidebar';

import { COORDS_EKATERINBURG, BOUNDS_EKATERINBURG } from 'common/constants/coords';
import { POSITION_CLASSES } from 'common/constants/positions';

import { MapLocation } from 'components/Map/Location/MapLocation';
import { MapTransport } from 'components/Map/Transport/MapTransport';
import { MapZoomControl } from 'components/Map/ZoomControl/MapZoomControl';
import { MapWelcomeMessage } from 'components/Map/WelcomeMessage/MapWelcomeMessage';
import { MapSearchBar } from 'components/Map/SearchBar/SearchBar';
import { Info } from 'components/Map/Info/Info';

import styles from './MapMainContainer.module.css';
import 'leaflet/dist/leaflet.css';

const tileServerUrl = `https://tiles.ekaterinburg.city/styles/basic-white/{z}/{x}/{y}${
    devicePixelRatio > 1 ? '@2x' : ''
}.png`;

const cn = classNames.bind(styles);

function MapMainContainer({ zoom = 16, showControls = true }) {
    const [sidebar, setSidebar] = useState<React.ReactElement>(null);

    useEffect(() => {
        sidebarService.setSidebar = setSidebar;

        try {
            const hasVisited = localStorage.getItem('hasVisited');

            if (!hasVisited && showControls) {
                sidebarService.open({ component: <MapWelcomeMessage /> });
                localStorage.setItem('hasVisited', '1');
            }
        } catch (e) {}
    }, []);

    return (
        <MapContainer
            center={COORDS_EKATERINBURG}
            attributionControl={null}
            zoomControl={false}
            zoom={zoom}
            zoomDelta={0.6}
            minZoom={13}
            maxBounds={BOUNDS_EKATERINBURG}
            scrollWheelZoom
            doubleClickZoom={false}
            className={cn(styles.Map)}
        >
            <TileLayer url={tileServerUrl} />

            {showControls && (
                <>
                    <Pane name="location" style={{ zIndex: 400 }} />
                    <MapLocation />
                    <MapZoomControl position="bottomright" />
                </>
            )}

            <MapTransport />
            {showControls && (
                <>
                    <div
                        className={cn(
                            POSITION_CLASSES.topleft,
                            sidebarStyles.leafletSidebar,
                            styles.MapSidebar,
                        )}
                    >
                        <MapSearchBar />

                        {sidebar}
                    </div>
                    <div
                        className={cn(
                            POSITION_CLASSES.topright,
                            sidebarStyles.leafletSidebar,
                            styles.MapAdditionalButtons,
                        )}
                    >
                        <Info />
                    </div>
                </>
            )}
        </MapContainer>
    );
}

export default MapMainContainer;
