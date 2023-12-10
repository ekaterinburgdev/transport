import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import t from 'utils/typograph';

import Close from 'public/icons/close.svg';

import styles from './Modal.module.css';

const cn = classNames.bind(styles);

export function Modal({ title = null, children, onClose = () => {} }) {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        ref.current.showModal();
        // Remove focus after open
        (document.activeElement as HTMLElement).blur();

        ref.current.addEventListener('close', onClose);

        return () => ref.current?.removeEventListener('close', onClose);
    }, []);

    const close = () => {
        ref.current.close();
    };

    return (
        <dialog className={cn(styles.Modal)} ref={ref}>
            <button className={cn(styles.ModalClose)} onClick={close}>
                <Close />
            </button>

            {title && <h1 className={cn(styles.ModalTitle)}>{t(title)}</h1>}

            <div className={cn(styles.ModalInner)}>{children}</div>
        </dialog>
    );
}
