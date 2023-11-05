import React from 'react';
import classNames from 'classnames/bind';

import { MarqueeProps } from './Marquee.types';

import styles from './Marquee.module.css';

const cn = classNames.bind(styles);

export function Marquee({ items }: MarqueeProps) {
    return (
        <div className={cn(styles.Marquee)}>
            <div className={cn(styles.MarqueeInner)}>
                {items.map(({ id, message }) => (
                    <div key={id} className={cn(styles.MarqueeItem)}>
                        {message}
                    </div>
                ))}
            </div>
        </div>
    );
}
