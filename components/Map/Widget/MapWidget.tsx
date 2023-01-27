import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

import sidebarStyles from 'styles/leaflet-sidebar.module.css';
import { POSITION_CLASSES } from 'common/constants/positions';

import styles from './MapWidget.module.css';

const cn = classNames.bind(styles);

export function MapWidget() {
    return (
        <div
            className={cn(
                POSITION_CLASSES.bottomleft,
                styles.MapWidget,
                sidebarStyles.leafletSidebar,
            )}
        >
            <Link href="https://ekaterinburg.design/">
                <Image src="/icons/ecosystem.svg" width={60} height={62} />
            </Link>
            <Image src="/icons/transport-logo.svg" width={60} height={62} />
            <span>
                Транспорт
                <br />
                Екатеринбурга
            </span>
        </div>
    );
}
