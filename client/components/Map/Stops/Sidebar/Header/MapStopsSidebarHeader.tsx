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
    types: Exclude<StopType, StopType.TrollBus>[];
}

export function MapStopsSidebarHeader({ types, name }: MapStopsSidebarHeaderProps) {
    return (
        <div className={cn(styles.MapStopsSidebarHeaderWrapper)}>
            <MapStopsSidebarRow mix={styles.MapStopsSidebarHeader}>
                <div className={cn(styles.MapStopsSidebarHeaderInfo)}>
                    <Typography variant="h3">
                        {types.map((t) => (
                            <IconFont key={t} name={IconFontCharsNames[t]} />
                        ))}
                    </Typography>
                    <Typography variant="h4">
                        {t(name)}
                    </Typography>
                </div>
            </MapStopsSidebarRow>
            <Divider />
        </div>
    );
}
