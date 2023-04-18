import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import sidebarStyles from 'styles/leaflet-sidebar.module.css';

import { IconFontCharsNames } from 'common/constants/iconFontChars';
import { POSITION_CLASSES } from 'common/constants/positions';
import { VEHICLE_TYPE_COLORS } from 'common/constants/colors';

import { Divider } from 'components/UI/Divider/Divider';
import { Typography } from 'components/UI/Typography/Typography';
import { IconFont } from 'components/UI/Typography/IconFont/IconFont';

import { sidebarService } from 'services/sidebar/sidebar';

import { useDisablePropagation } from 'hooks/useDisablePropagation';

import Close from 'public/icons/close.svg';

import styles from './MapStationsSidebar.module.css';
import { StopInfoItem, StopType } from 'transport-common/types/masstrans';
import { massTransApi } from 'api/masstrans/masstrans';

export type MapStationsSidebarProps = {
    type: StopType;
    name: string;
    id: string;
};

const cn = classNames.bind(styles);

export function MapStationsSidebar({ type, name, id }: MapStationsSidebarProps) {
    const [vehicleAwait, setVehicleAwait] = useState<StopInfoItem[]>(null);
    const [loading, setLoading] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const updateVehicleArriveInfo = useCallback(async () => {
        try {
            const stopInfo = await massTransApi.getStopInfo(id);

            setVehicleAwait(stopInfo);
        } catch (e) {
            console.error('Ошибка при получении остановок');
        }

        setLoading(false);
    }, [id]);

    useEffect(() => {
        setLoading(true);
        updateVehicleArriveInfo();
    }, [id]);

    useDisablePropagation(ref);

    const getTimeToArrive = (arriveTime: string) => {
        const [hours, minutes] = arriveTime.split(':');

        const arriveDate = new Date();
        arriveDate.setHours(parseInt(hours, 10));
        arriveDate.setMinutes(parseInt(minutes, 10));

        const now = new Date();

        if (arriveDate.getHours() === 0 && now.getHours() === 23) {
            arriveDate.setDate(now.getDate() + 1);
        }

        return Math.max(Math.round((arriveDate.getTime() - now.getTime()) / 1000 / 60), 0);
    };

    return (
        <div
            ref={ref}
            className={cn(
                POSITION_CLASSES.topleft,
                styles.MapStationsSidebar,
                sidebarStyles.leafletSidebar,
            )}
        >
            <div className={cn(styles.MapStationsSidebarWrapper)}>
                <div className={cn(styles.MapStationsSidebarHeaderWrapper)}>
                    <div
                        className={cn(
                            styles.MapStationsSidebarRow,
                            styles.MapStationsSidebarHeader,
                        )}
                    >
                        <div className={cn(styles.MapStationsSidebarHeaderInfo)}>
                            <Typography variant="h3">
                                {type
                                    .split('-')
                                    .reverse()
                                    .map((t) => (
                                        <IconFont key={t} name={IconFontCharsNames[t]} />
                                    ))}
                            </Typography>
                            <Typography variant="h3">{name}</Typography>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                sidebarService.close();
                            }}
                            className={cn(styles.MapStationsSidebarCloseButton)}
                        >
                            <Close className={cn(styles.MapStationsSidebarCloseIcon)} />
                        </button>
                    </div>
                    <Divider />
                </div>
                <div
                    className={cn(styles.MapStationsSidebarRow, styles.MapStationsSidebarVehicles)}
                >
                    {!loading && Boolean(vehicleAwait) ? (
                        <>
                            {vehicleAwait.map((vehicle) => (
                                <div
                                    key={`${vehicle.route}-${vehicle.type}-${vehicle.arriveTime}`}
                                    className={cn(styles.MapStationsSidebarVehicle)}
                                >
                                    <div className={cn(styles.MapStationsSidebarVehicleInfo)}>
                                        <div
                                            className={cn(styles.MapStationsSidebarVehicleRoute)}
                                            style={{
                                                backgroundColor: VEHICLE_TYPE_COLORS[vehicle.type],
                                            }}
                                        >
                                            {vehicle.route}
                                        </div>
                                        <div>
                                            <span
                                                className={cn(
                                                    styles.MapStationsSidebarVehicleEndpoint,
                                                )}
                                            >
                                                {vehicle.to}
                                            </span>
                                            {Boolean(vehicle.through.length) && (
                                                <>
                                                    <br />
                                                    <span
                                                        className={cn(
                                                            styles.MapStationsSidebarVehicleKeypoints,
                                                        )}
                                                    >
                                                        {`через ${vehicle.through.join(', ')}`}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className={cn(styles.MapStationsSidebarVehicleArriveTime)}>
                                        {getTimeToArrive(vehicle.arriveTime) > 15
                                            ? vehicle.arriveTime
                                            : `${getTimeToArrive(vehicle.arriveTime)} мин`}
                                    </div>
                                </div>
                            ))}
                            {vehicleAwait.length === 0 && (
                                <Typography variant="h4">
                                    О нет! В ближайшее время транспорта тут не будет
                                </Typography>
                            )}
                        </>
                    ) : (
                        <p>Загрузка...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
