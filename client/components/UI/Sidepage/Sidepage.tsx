import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import { sidebarService } from 'services/sidebar/sidebar';
import { CardPosition, useSwipeableCard } from 'hooks/useSwipeableCard';
import { useDisablePropagation } from 'hooks/useDisablePropagation';

import Close from 'public/icons/close.svg';

import styles from './Sidepage.module.css';

const cn = classNames.bind(styles);

export function Sidepage({ children }: React.PropsWithChildren) {
    const ref = useRef<HTMLDivElement>(null);

    useDisablePropagation(ref);

    const [currentPosition, onDragEnd, onDrag] = useSwipeableCard(CardPosition.HalfOpen);

    useEffect(() => {
        if (currentPosition === CardPosition.Hidden) {
            setTimeout(() => {
                sidebarService.close();
            }, 100)
        }
    }, [currentPosition]);

    return (
        <div
            ref={ref}
            className={cn(styles.Sidepage, styles[`Sidepage_${currentPosition}`])}
            id="Sidepage-scroll-container"
        >
            <div
                className={cn(styles.SidepageDragArea)}
                onTouchMoveCapture={onDrag}
                onTouchEndCapture={onDragEnd}
            />
            <button
                type="button"
                onClick={() => {
                    sidebarService.close();
                }}
                className={cn(styles.SidepageCloseButton)}
            >
                <span className={cn(styles.SidepageCloseButtonWrapper)}>
                    <Close className={cn(styles.SidepageCloseIcon)} />
                </span>
            </button>
            <div className={cn(styles.SidepageContent)}>{children}</div>
        </div>
    );
}
