import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import t from 'utils/typograph';

import { ModalProps } from './Modal.types';

import Close from 'public/icons/close.svg';

import styles from './Modal.module.css';

const cn = classNames.bind(styles);

export function Modal({
    title = null,
    alignCenter = false,
    maxWidth,
    onClose = () => {},
    children
} : ModalProps) {
    const ref = useRef<HTMLDialogElement>(null);

    const close = () => {
        ref.current.close();
    };

    useEffect(() => {
        ref.current.showModal();
        // Remove focus after open
        (document.activeElement as HTMLElement).blur();
        
        const handleClickOutside = (e) => {
            if (ref.current.contains(e.target)) {
                close();
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, []);


    return (
        <dialog 
            className={cn(styles.Modal, { [`${styles.Modal_AlignCenter}`]: alignCenter })} 
            style={{ maxWidth }}
            onClose={onClose}
            ref={ref}
        >
            <div className={cn(styles.ModalInner)}>
                <button className={cn(styles.ModalClose)} onClick={close} aria-label="Закрыть">
                    <Close />
                </button>

                {title && <h1 className={cn(styles.ModalTitle)}>{t(title)}</h1>}

                <div className={cn(styles.ModalContent)}>{children}</div>
            </div>
        </dialog>
    );
}
