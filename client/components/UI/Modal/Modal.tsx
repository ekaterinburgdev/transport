import React, { useRef } from 'react';
import classNames from 'classnames/bind';

import { sidebarService } from 'services/sidebar/sidebar';
import sidebarStyles from 'styles/leaflet-sidebar.module.css';
import { POSITION_CLASSES } from 'common/constants/positions';
import { ModalPosition, useModalSheet } from 'hooks/useModalSheet/useModalSheet';
import { useDisablePropagation } from 'hooks/useDisablePropagation';

import Close from 'public/icons/close.svg';

import styles from './Modal.module.css';

const cn = classNames.bind(styles);

export function Modal({ children }: React.PropsWithChildren) {
    const ref = useRef<HTMLDivElement>(null);

    useDisablePropagation(ref);

    const [currentPosition, onDragEnd, onDrag] = useModalSheet(ModalPosition.HalfOpen);

    return (
        <div
            ref={ref}
            className={cn(
                POSITION_CLASSES.topleft,
                styles.Modal,
                sidebarStyles.leafletSidebar,
                styles[`Modal_${currentPosition}`],
            )}
            id="modal-scroll-container"
        >
            <div
                className={cn(styles.ModalDragArea)}
                onTouchMoveCapture={onDrag}
                onTouchEndCapture={onDragEnd}
            />
            <button
                type="button"
                onClick={() => {
                    sidebarService.close();
                }}
                className={cn(styles.ModalCloseButton)}
            >
                <span className={cn(styles.ModalCloseButtonWrapper)}>
                    <Close className={cn(styles.ModalCloseIcon)} />
                </span>
            </button>
            <div className={cn(styles.ModalContent)}>{children}</div>
        </div>
    );
}
