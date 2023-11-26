import React, { useRef } from 'react';
import classNames from 'classnames/bind';

import { MarqueeProps } from './Marquee.types';

import styles from './Marquee.module.css';
import { useSmoothCorners } from '../Card/useSmoothCorners';

const cn = classNames.bind(styles);

export function Marquee({ items }: MarqueeProps) {
    const MarqueeRef = useRef(null);
    useSmoothCorners(MarqueeRef);

    return (
        <div className={cn(styles.Marquee)} ref={MarqueeRef}>
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
