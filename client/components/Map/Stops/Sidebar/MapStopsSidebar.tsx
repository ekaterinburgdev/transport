import React, { useMemo } from 'react';
import classNames from 'classnames/bind';

import { StopType } from 'transport-common/types/masstrans';
import t from 'utils/typograph';

import styles from './MapStopsSidebar.module.css';
import { MapStopsSidebarHeader } from './Header/MapStopsSidebarHeader';
import { MapStopsSidebarStopsList } from './StopsList/MapStopsSidebarStopsList';

export type MapStopsSidebarProps = {
    type: StopType;
    name: string;
};

const cn = classNames.bind(styles);

export function MapStopsSidebar({ type, name }: MapStopsSidebarProps) {
    const iconTypes = useMemo(() => {
        return type.split('-').reverse() as Exclude<StopType, StopType.TrollBus>[];
    }, [type]);

    return (
        <div className={cn(styles.MapStopsSidebar)}>
            <MapStopsSidebarHeader name={t(name)} types={iconTypes} />
            <MapStopsSidebarStopsList />
        </div>
    );
}
