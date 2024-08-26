import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { CardPosition, useSwipeableCard } from 'hooks/useSwipeableCard';
import t from 'utils/typograph';
import { ModalProps } from './Modal.types';

import Close from 'public/icons/close.svg';

import styles from './Modal.module.css';

const cn = classNames.bind(styles);

export function Modal({
    title = null,
    align = 'top',
    maxWidth,
    onClose = () => { },
    children
}: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null);
    const refInner = useRef<HTMLDivElement>(null);

    const mobilePosition = align === 'center'
        ? CardPosition.HalfOpen
        : CardPosition.FullOpen;

    const [currentPosition, onDragEnd, onDrag] = useSwipeableCard(mobilePosition);

    const close = () => {
        ref.current.close();
    };

    const handleClickOutside = (e) => {
        if (e.target === ref.current) {
            close();
        }
    };

    useEffect(() => {
        if (refInner.current) {
            refInner.current.scrollTo(0, 0);
        }
        ref.current.showModal();
        (document.activeElement as HTMLElement).blur();
    }, []);

    return (
        <dialog
            className={cn(styles.Modal, {
                [`${styles[`Modal_Align-${align}`]}`]: align,
                [`${styles[`Modal_Position-${currentPosition}`]}`]: currentPosition,
            })}
            style={{ maxWidth }}
            onClick={handleClickOutside}
            onClose={onClose}
            ref={ref}
        >
            <div className={cn(styles.ModalInner)} ref={refInner}>
                <div
                    className={cn(styles.ModalDragArea)}
                    onTouchMoveCapture={onDrag}
                    onTouchEndCapture={onDragEnd}
                />
                {title && <h1 className={cn(styles.ModalTitle)}>{t(title)}</h1>}
                <div className={cn(styles.ModalContent)}>{children}</div>
            </div>

            <button className={cn(styles.ModalClose)} onClick={() => close()} aria-label="Закрыть">
                <Close />
            </button>
        </dialog>
    );
}
