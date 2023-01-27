import React from 'react';
import classNames from 'classnames/bind';

import { VEHICLE_TYPE_COLORS } from 'common/constants/colors';

import { MapVehicleMarkerProps } from './MapVehicleMarker.types';

import styles from './MapVehicleMarker.module.css';

const cn = classNames.bind(styles);

export function MapVehicleMarker({
    boardId,
    routeNumber,
    type,
    isCourseEast,
    disability,
    warning,
    course,
    additionalInfo = true,
}: MapVehicleMarkerProps) {
    const arrowImage = `/icons/${type}-arrow.svg`;
    const transportImage = `/icons/${type}-light.svg`;
    const disabilityIcon = `/icons/${type}-disability.svg`;
    const warningIcon = '/icons/warning.svg';
    const color = VEHICLE_TYPE_COLORS[type];

    return (
        <div
            id={`vehicle-${boardId}-${routeNumber}`}
            style={{ transform: 'translate3d(0px, 0px, 0px)' }}
        >
            <picture>
                <source srcSet={arrowImage} type="image/svg+xml" />
                <img
                    style={{ transform: `rotate(${course}deg)`, transformOrigin: '20px 20px' }}
                    className={cn(styles.MapVehicleMarkerArrow)}
                    src={arrowImage}
                    alt="Vehicle arrow icon"
                />
            </picture>
            <div>
                <picture>
                    <source srcSet={transportImage} type="image/svg+xml" />
                    <img
                        className={cn(styles.MapVehicleMarkerIcon)}
                        src={transportImage}
                        alt="Vehicle type icon"
                    />
                </picture>
                {additionalInfo && (
                    <div
                        className={`${cn(styles.MapVehicleMarkerInfo)} ${
                            isCourseEast ? cn(styles.MapVehicleMarkerInfo_course_east) : ''
                        }`}
                        style={{ color }}
                    >
                        <div
                            className={`${cn(styles.MapVehicleMarkerRoute)} ${cn(
                                styles.MapVehicleMarkerInfoItem,
                            )}`}
                        >
                            {routeNumber}
                        </div>
                        {disability && !warning && (
                            <div className={cn(styles.MapVehicleMarkerInfoItem)}>
                                <picture>
                                    <source srcSet={disabilityIcon} type="image/svg+xml" />
                                    <img
                                        className={cn(styles.MapVehicleMarkerDisabilityIcon)}
                                        src={disabilityIcon}
                                        alt="Vehicle low-floor icon"
                                    />
                                </picture>
                            </div>
                        )}
                        {warning && !disability && (
                            <div className={cn(styles.MapVehicleMarkerInfoItem)}>
                                <picture>
                                    <source srcSet={warningIcon} type="image/svg+xml" />
                                    <img
                                        className={cn(styles.MapVehicleMarkerWarningIcon)}
                                        src={warningIcon}
                                        alt="Vehicle warning icon"
                                    />
                                </picture>
                            </div>
                        )}
                        {warning && disability && (
                            <div className={`${cn(styles.MapVehicleMarkerDisabilityWarning)}`}>
                                <div className={cn(styles.MapVehicleMarkerInfoItem)}>
                                    <picture>
                                        <source srcSet={disabilityIcon} type="image/svg+xml" />
                                        <img
                                            className={cn(styles.MapVehicleMarkerDisabilityIcon)}
                                            src={disabilityIcon}
                                            alt="Vehicle low-floor icon"
                                        />
                                    </picture>
                                </div>
                                <div className={cn(styles.MapVehicleMarkerInfoItem)}>
                                    <picture>
                                        <source srcSet={warningIcon} type="image/svg+xml" />
                                        <img
                                            className={cn(styles.MapVehicleMarkerWarningIcon)}
                                            src={warningIcon}
                                            alt="Vehicle warning icon"
                                        />
                                    </picture>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
