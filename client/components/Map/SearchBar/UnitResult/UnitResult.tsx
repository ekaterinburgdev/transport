import React, { useCallback } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import { Unit } from 'transport-common/types/masstrans';

import { store } from 'state';
import { setCurrentVehicle } from 'state/features/public-transport';
import { sidebarService } from 'services/sidebar/sidebar';
import { MapVehiclesSidebar } from 'components/Map/Vehicles/Sidebar/MapVehiclesSidebar';
import { MapVehiclesRoute } from 'components/Map/Vehicles/Route/MapVehiclesRoute';

import styles from './UnitResult.module.css';

const cn = classNames.bind(styles);

export function MapSearchBarUnitResult(props: Unit) {
    const dispatch = useDispatch<typeof store.dispatch>();

    const setSelectedVehicle = useCallback(
        (unit: Unit) => {
            dispatch(
                setCurrentVehicle({
                    num: unit.num,
                    routeDirection: unit.routeDirection,
                    type: unit.type,
                    routeId: unit.routeId,
                    shouldFlyTo: true,
                }),
            );

            sidebarService.close();
        },
        [dispatch],
    );

    return (
        <div
            className={cn(styles.MapSearchBarUnitResult__wrapper)}
            onClick={() => setSelectedVehicle(props)}
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
        </div>
    );
}
