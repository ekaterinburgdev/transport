import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import { Unit } from 'transport-common/types/masstrans';

import { State } from 'common/types/state';
import { store } from 'state';
import { setCurrentVehicle } from 'state/features/public-transport';
import { sidebarService } from 'services/sidebar/sidebar';
import { MapVehiclesRoute } from 'components/Map/Vehicles/Route/MapVehiclesRoute';

import styles from './UnitResult.module.css';

const cn = classNames.bind(styles);

export function MapSearchBarUnitResult(props: Unit) {
    const dispatch = useDispatch<typeof store.dispatch>();
    const currentVehicle = useSelector((state: State) => state.publicTransport.currentVehicle);

    const setSelectedVehicle = useCallback(() => {
        dispatch(
            setCurrentVehicle({
                num: props.num,
                routeDirection: props.routeDirection,
                type: props.type,
                routeId: props.routeId,
                shouldFlyTo: true,
                shouldFilterByRouteDirection: true,
            }),
        );

        sidebarService.close();
    }, [dispatch, props.num, props.routeDirection, props.type, props.routeId]);

    const isSelected = useMemo(() => {
        return (
            currentVehicle?.num === props.num &&
            currentVehicle?.routeDirection === props.routeDirection
        );
    }, [currentVehicle?.num, props.num, currentVehicle?.routeDirection, props.routeDirection]);

    return (
        <button
            className={cn(styles.MapSearchBarUnitResult__wrapper, {
                [styles.MapSearchBarUnitResult__selected]: isSelected,
            })}
            onClick={() => setSelectedVehicle()}
        >
            <MapVehiclesRoute type={props.type} num={props.num} />
            <p
                className={cn(
                    styles.MapSearchBarUnitResult__text,
                    styles.MapSearchBarUnitResult__text_shallow,
                )}
            >
                {props.firstStation} – {props.lastStation}
            </p>
        </button>
    );
}
