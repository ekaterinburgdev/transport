import React, { useCallback, useMemo } from 'react';
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
    const currentStop = useSelector((state: State) => state.publicTransport.currentStop);

    const setSelectedStop = useCallback(() => {
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
    }, [dispatch, allStops, stopId]);

    const isSelected = useMemo(() => {
        return currentStop === stopId;
    }, [currentStop, stopId]);

    return (
        <button
            className={cn(styles.MapSearchBarStopResult__wrapper, {
                [styles.MapSearchBarStopResult__wrapper_selected]: isSelected,
            })}
            onClick={() => setSelectedStop()}
        >
            <img src={`/icons/${type === StopType.TrollBus ? 'bus-troll' : type}.svg`} alt="" />
            <p className={cn(styles.MapSearchBarStopResult__text)}>{title}</p>
        </button>
    );
}
