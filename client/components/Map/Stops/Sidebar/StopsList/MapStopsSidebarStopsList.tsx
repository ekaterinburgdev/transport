import React from 'react';
import { useSelector } from 'react-redux';

import { State } from 'common/types/state';
import { Typography } from 'components/UI/Typography/Typography';
import t from 'utils/typograph';

import { MapStopsSidebarRow } from '../Row/MapStopsSidebarRow';
import { MapStopsSidebarStopsListItem } from './Item/MapStopsSidebarStopsListItem';

import styles from './MapStopsSidebarStopsList.module.css';

export function MapStopsSidebarStopsList() {
    const stopInfo = useSelector((state: State) => state.publicTransport.stopInfo || []);

    return (
        <MapStopsSidebarRow mix={styles.MapStopsSidebarStopsList}>
            {stopInfo.map((vehicle) => (
                <MapStopsSidebarStopsListItem
                    vehicle={vehicle}
                    key={`${vehicle.route}-${vehicle.arriveTime}`}
                />
            ))}
            {stopInfo.length === 0 && (
                <Typography variant="h4">
                    {t('О, нет! В ближайшее время транспорта тут не будет')}
                </Typography>
            )}
        </MapStopsSidebarRow>
    );
}
