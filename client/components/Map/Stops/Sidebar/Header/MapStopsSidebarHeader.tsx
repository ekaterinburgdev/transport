import React from 'react';

import classNames from 'classnames/bind';

import { StopType } from 'transport-common/types/masstrans';

import { Typography } from 'components/UI/Typography/Typography';
import { IconFont } from 'components/UI/Typography/IconFont/IconFont';
import { IconFontCharsNames } from 'common/constants/iconFontChars';
import { Divider } from 'components/UI/Divider/Divider';
import t from 'utils/typograph';

import { MapStopsSidebarProps } from '../MapStopsSidebar';
import { MapStopsSidebarRow } from '../Row/MapStopsSidebarRow';

import styles from './MapStopsSidebarHeader.module.css';

const cn = classNames.bind(styles);

export interface MapStopsSidebarHeaderProps extends Pick<MapStopsSidebarProps, 'name'> {
    type: StopType;
}

export function MapStopsSidebarHeader({ type, name }: MapStopsSidebarHeaderProps) {
    const iconSrc = `/icons/${type === StopType.TrollBus ? 'bus-troll' : type}.svg`;

    return (
        <div className={cn(styles.MapStopsSidebarHeaderWrapper)}>
            <MapStopsSidebarRow mix={styles.MapStopsSidebarHeader}>
                <div className={cn(styles.MapStopsSidebarHeaderInfo)}>
                    <img className={cn(styles.MapStopsSidebarHeaderIcon)} src={iconSrc} />
                    <Typography variant="h4">{t(name)}</Typography>
                </div>
            </MapStopsSidebarRow>
            <Divider />
        </div>
    );
}
