import React, { useRef } from 'react';
import classNames from 'classnames/bind';

import sidebarStyles from 'styles/leaflet-sidebar.module.css';

import { IconFontCharsNames } from 'common/constants/iconFontChars';
import { POSITION_CLASSES } from 'common/constants/positions';
import { VEHICLE_TYPE_COLORS } from 'common/constants/colors';

import { Divider } from 'components/UI/Divider/Divider';
import { Typography } from 'components/UI/Typography/Typography';
import { IconFont } from 'components/UI/Typography/IconFont/IconFont';

import { sidebarService } from 'services/sidebar/sidebar';

import { getHHMMFormat } from 'utils/dateFormatter';

import { useDisablePropagation } from 'hooks/useDisablePropagation';

import Close from 'public/icons/close.svg';

import { vehicleAwait } from './mocks/vehicle-await';

import styles from './MapStationsSidebar.module.css';
import { StopType } from 'transport-common/types/masstrans';

export type MapStationsSidebarProps = {
    type: StopType;
    name: string;
};

const cn = classNames.bind(styles);

export function MapStationsSidebar({ type, name }: MapStationsSidebarProps) {
    const ref = useRef<HTMLDivElement>(null);

    useDisablePropagation(ref);

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
                <div className={cn(styles.MapStationsSidebarRow, styles.MapStationsSidebarHeader)}>
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
                <div
                    className={cn(styles.MapStationsSidebarRow, styles.MapStationsSidebarVehicles)}
                >
                    {vehicleAwait.map((vehicle) => (
                        <div key={vehicle.boardId} className={cn(styles.MapStationsSidebarVehicle)}>
                            <div className={cn(styles.MapStationsSidebarVehicleInfo)}>
                                <div
                                    className={cn(styles.MapStationsSidebarVehicleRoute)}
                                    style={{ backgroundColor: VEHICLE_TYPE_COLORS[vehicle.type] }}
                                >
                                    {vehicle.route}
                                </div>
                                <div>
                                    <span className={cn(styles.MapStationsSidebarVehicleEndpoint)}>
                                        {vehicle.to}
                                    </span>
                                    <br />
                                    <span className={cn(styles.MapStationsSidebarVehicleKeypoints)}>
                                        {`через ${vehicle.through.join(', ')}`}
                                    </span>
                                </div>
                            </div>
                            <div className={cn(styles.MapStationsSidebarVehicleArriveTime)}>
                                {vehicle.time > 15
                                    ? `${getHHMMFormat(
                                          new Date(Date.now() + vehicle.time * 60000),
                                      )}`
                                    : `${vehicle.time} мин`}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
