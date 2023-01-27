import React from 'react';
import classNames from 'classnames/bind';

import styles from './Marquee.module.css';

const cn = classNames.bind(styles);

export function MapPreview() {
    return (
        <div className={cn(styles.MapPreview)} />
    );
}
