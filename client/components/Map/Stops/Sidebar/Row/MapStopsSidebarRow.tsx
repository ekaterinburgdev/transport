import React, { PropsWithChildren } from 'react';

import classNames from 'classnames/bind';

import styles from './MapStopsSidebarRow.module.css';

const cn = classNames.bind(styles);

export interface MapStopsSidebarRowProps {
    mix: string;
}

export function MapStopsSidebarRow({ children, mix }: PropsWithChildren<MapStopsSidebarRowProps>) {
    return <div className={cn(styles.MapStopsSidebarRow, mix)}>{children}</div>;
}
