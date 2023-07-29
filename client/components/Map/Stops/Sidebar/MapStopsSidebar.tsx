import React, { useCallback } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import { State } from 'common/types/state';
import { IconFontCharsNames } from 'common/constants/iconFontChars';
import { VEHICLE_TYPE_COLORS } from 'common/constants/colors';

import { Divider } from 'components/UI/Divider/Divider';
import { Typography } from 'components/UI/Typography/Typography';
import { IconFont } from 'components/UI/Typography/IconFont/IconFont';

import { StopType } from 'transport-common/types/masstrans';

import styles from './MapStopsSidebar.module.css';
import t from 'utils/typograph';

export type MapStopsSidebarProps = {
    type: StopType;
    name: string;
};

const cn = classNames.bind(styles);

export function MapStopsSidebar({ type, name }: MapStopsSidebarProps) {
    const stopInfo = useSelector((state: State) => state.publicTransport.stopInfo);

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
                        <Typography variant="h3">{t(name)}</Typography>
                    </div>
                </div>
                <Divider />
            </div>
            <div className={cn(styles.MapStopsSidebarRow, styles.MapStopsSidebarVehicles)}>
                {Boolean(stopInfo) ? (
                    <>
                        {stopInfo.map((vehicle) => (
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
                                        {t(vehicle.route)}
                                    </div>
                                    <div>
                                        <span className={cn(styles.MapStopsSidebarVehicleEndpoint)}>
                                            {t(vehicle.to)}
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
                        {stopInfo.length === 0 && (
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
