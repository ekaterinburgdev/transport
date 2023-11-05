import React, { useCallback } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useMap } from 'react-leaflet';

import { Stop, StopType } from 'transport-common/types/masstrans';

import { store } from 'state';
import { setCurrentStop } from 'state/features/public-transport';
import { sidebarService } from 'services/sidebar/sidebar';
import { State } from 'common/types/state';
import { MapStopsSidebar } from 'components/Map/Stops/Sidebar/MapStopsSidebar';

import styles from './StopResult.module.css';

const cn = classNames.bind(styles);

export function MapSearchBarStopResult({ type, stopId, title }: Stop) {
    const dispatch = useDispatch<typeof store.dispatch>();
    const map = useMap();
    const allStops = useSelector((state: State) => state.publicTransport.stops);

    const setSelectedStop = useCallback(
        (stopId: string) => {
            const stop = allStops.find((stopFullData) => stopFullData.attributes.stopId === stopId);

            if (!stop) {
                return;
            }

            const { attributes: stopData } = stop;

            dispatch(
                setCurrentStop({
                    currentStop: stopId,
                }),
            );

            map.flyTo(stopData.coords, 15);

            sidebarService.open({
                component: <MapStopsSidebar type={stopData.type} name={stopData.title} />,
                onClose: () => dispatch(setCurrentStop(null)),
            });
        },
        [dispatch, allStops],
    );

    return (
        <div
            className={cn(styles.MapSearchBarStopResult__wrapper)}
            onClick={() => setSelectedStop(stopId)}
        >
            <img src={`/icons/${type === StopType.TrollBus ? 'bus-troll' : type}.svg`} />
            <p className={cn(styles.MapSearchBarStopResult__text)}>{title}</p>
        </div>
    );
}
