import React, { useRef } from 'react';
import classNames from 'classnames/bind';

import sidebarStyles from 'styles/leaflet-sidebar.module.css';
import { POSITION_CLASSES } from 'common/constants/positions';
import { useModalSheet } from 'hooks/useModalSheet/useModalSheet';
import { useDisablePropagation } from 'hooks/useDisablePropagation';

import styles from './Modal.module.css';

const cn = classNames.bind(styles);

export function Modal({ children }: React.PropsWithChildren) {
    const ref = useRef<HTMLDivElement>(null);

    useDisablePropagation(ref);

    const [currentPosition, onDragEnd, onDrag] = useModalSheet();

    return (
        <div
            ref={ref}
            className={cn(
                POSITION_CLASSES.topleft,
                styles.Modal,
                sidebarStyles.leafletSidebar,
                styles[`Modal_${currentPosition}`],
            )}
        >
            <div
                className={cn(styles.ModalDragArea)}
                onTouchMoveCapture={onDrag}
                onTouchEndCapture={onDragEnd}
            />
            <div className={cn(styles.ModalContent)} id="modal-scroll-wrapper">
                {children}
            </div>
        </div>
    );
}
