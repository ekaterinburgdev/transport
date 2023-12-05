import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Modal.module.css';

const cn = classNames.bind(styles);

export function Modal({ children }: React.PropsWithChildren) {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        ref.current.showModal()
    }, [])

    return (
        <dialog className={cn('Modal')} ref={ref}>
            {children}
        </dialog>
    );
}
