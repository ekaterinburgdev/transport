import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import { StopInfoItem } from 'transport-common/types/masstrans';

import { VEHICLE_TYPE_COLORS } from 'common/constants/colors';
import { store } from 'state';
import { setCurrentVehicle } from 'state/features/public-transport';
import t from 'utils/typograph';

import styles from './MapStopsSidebarStopsListItem.module.css';
import { getTimeToArrive } from './MapStopsSidebarStopsListItem.utils';
import { State } from 'common/types/state';

const cn = classNames.bind(styles);

export interface MapStopsSidebarStopsListItemProps {
    vehicle: StopInfoItem;
}

export function MapStopsSidebarStopsListItem({ vehicle }: MapStopsSidebarStopsListItemProps) {
    const dispatch = useDispatch<typeof store.dispatch>();
    const currentVehicleRoute = useSelector(
        (state: State) => state.publicTransport.currentVehicle?.num,
    );

    const timeToArrive = useMemo(() => {
        const minutesToArrive = getTimeToArrive(vehicle.arriveTime);

        return minutesToArrive > 15 ? vehicle.arriveTime : `${minutesToArrive} мин`;
    }, [vehicle.arriveTime]);

    const setSelectedVehicle = useCallback(() => {
        if (vehicle.route === currentVehicleRoute) {
            dispatch(setCurrentVehicle(null));

            return;
        }

        dispatch(
            setCurrentVehicle({
                num: vehicle.route,
                routeDirection: vehicle.routeDirection,
                type: vehicle.type,
                routeId: vehicle.routeId,
                shouldClear: false,
            }),
        );
    }, [
        dispatch,
        vehicle.route,
        vehicle.routeDirection,
        vehicle.type,
        currentVehicleRoute,
        vehicle.routeId,
    ]);

    return (
        <div
            key={`${vehicle.route}-${vehicle.type}-${vehicle.arriveTime}`}
            className={cn(styles.MapStopsSidebarVehicle, {
                [styles.MapStopsSidebarVehicle_isSelected]: currentVehicleRoute === vehicle.route,
            })}
            onClick={setSelectedVehicle}
            style={
                {
                    '--vehicle-color': VEHICLE_TYPE_COLORS[vehicle.type],
                } as React.CSSProperties
            }
        >
            <div className={cn(styles.MapStopsSidebarVehicleInfo)}>
                <div className={cn(styles.MapStopsSidebarVehicleRoute)}>{vehicle.route}</div>
                <div>
                    <span className={cn(styles.MapStopsSidebarVehicleEndpoint)}>
                        {t(vehicle.to)}
                    </span>
                    {Boolean(vehicle.through.length) && (
                        <>
                            <br />
                            <span className={cn(styles.MapStopsSidebarVehicleKeypoints)}>
                                {t(`через ${vehicle.through.join(', ')}`)}
                            </span>
                        </>
                    )}
                </div>
            </div>
            <div className={cn(styles.MapStopsSidebarVehicleArriveTime)}>{timeToArrive}</div>
        </div>
    );
}
