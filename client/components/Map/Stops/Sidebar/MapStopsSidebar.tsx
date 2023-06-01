import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import { IconFontCharsNames } from 'common/constants/iconFontChars';
import { VEHICLE_TYPE_COLORS } from 'common/constants/colors';

import { Divider } from 'components/UI/Divider/Divider';
import { Typography } from 'components/UI/Typography/Typography';
import { IconFont } from 'components/UI/Typography/IconFont/IconFont';

import { StopInfoItem, StopType } from 'transport-common/types/masstrans';
import { massTransApi } from 'api/masstrans/masstrans';

import styles from './MapStopsSidebar.module.css';

export type MapStopsSidebarProps = {
    type: StopType;
    name: string;
    id: string;
};

const cn = classNames.bind(styles);

export function MapStopsSidebar({ type, name, id }: MapStopsSidebarProps) {
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

    const getTimeToArrive = useCallback((arriveTime: string) => {
        const [hours, minutes] = arriveTime.split(':');

        const arriveDate = new Date();
        arriveDate.setHours(parseInt(hours, 10));
        arriveDate.setMinutes(parseInt(minutes, 10));

        const now = new Date();

        if (arriveDate.getHours() === 0 && now.getHours() === 23) {
            arriveDate.setDate(now.getDate() + 1);
        }

        return Math.max(Math.round((arriveDate.getTime() - now.getTime()) / 1000 / 60), 0);
    }, []);

    return (
        <div className={cn(styles.MapStopsSidebar)}>
            <div className={cn(styles.MapStopsSidebarHeaderWrapper)}>
                <div className={cn(styles.MapStopsSidebarRow, styles.MapStopsSidebarHeader)}>
                    <div className={cn(styles.MapStopsSidebarHeaderInfo)}>
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
                </div>
                <Divider />
            </div>
            <div className={cn(styles.MapStopsSidebarRow, styles.MapStopsSidebarVehicles)}>
                {!loading && Boolean(vehicleAwait) ? (
                    <>
                        {vehicleAwait.map((vehicle) => (
                            <div
                                key={`${vehicle.route}-${vehicle.type}-${vehicle.arriveTime}`}
                                className={cn(styles.MapStopsSidebarVehicle)}
                            >
                                <div className={cn(styles.MapStopsSidebarVehicleInfo)}>
                                    <div
                                        className={cn(styles.MapStopsSidebarVehicleRoute)}
                                        style={{
                                            backgroundColor: VEHICLE_TYPE_COLORS[vehicle.type],
                                        }}
                                    >
                                        {vehicle.route}
                                    </div>
                                    <div>
                                        <span className={cn(styles.MapStopsSidebarVehicleEndpoint)}>
                                            {vehicle.to}
                                        </span>
                                        {Boolean(vehicle.through.length) && (
                                            <>
                                                <br />
                                                <span
                                                    className={cn(
                                                        styles.MapStopsSidebarVehicleKeypoints,
                                                    )}
                                                >
                                                    {`через ${vehicle.through.join(', ')}`}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className={cn(styles.MapStopsSidebarVehicleArriveTime)}>
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
    );
}
