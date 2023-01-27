import React from 'react';
import classNames from 'classnames/bind';

import { MarqueeProps } from './MapPreview.types';

import styles from './Marquee.module.css';

const cn = classNames.bind(styles);

export function MarqueePreview({ items }: MarqueeProps) {
    return (
        <div className={cn(styles.MarqueePreview)} />
    );
}
