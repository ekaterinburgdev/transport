import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import { sidebarService } from 'services/sidebar/sidebar';
import { useDisablePropagation } from 'hooks/useDisablePropagation';
import InfoIcon from 'public/icons/info.svg';

import { MapWelcomeMessage } from '../WelcomeMessage/MapWelcomeMessage';

import styles from './Info.module.css';

const cn = classNames.bind(styles);

export function Info() {
    const infoButtonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useDisablePropagation(infoButtonRef);

    useEffect(() => {
        try {
            const hasVisited = localStorage.getItem('hasVisited');

            if (!hasVisited) {
                setIsOpen(true);
                sidebarService.open({
                    component: <MapWelcomeMessage />,
                    onClose: () => setIsOpen(false),
                });
                localStorage.setItem('hasVisited', '1');
            }
        } catch (e) {}
    }, []);

    const toggleSidebar = useCallback(() => {
        if (isOpen) {
            sidebarService.close();

            return;
        }

        setIsOpen(true);
        sidebarService.open({ component: <MapWelcomeMessage />, onClose: () => setIsOpen(false) });
    }, [isOpen, setIsOpen]);

    return (
        <button
            ref={infoButtonRef}
            className={cn(styles.MapInfo, {
                [styles.MapInfo_opened]: isOpen,
            })}
            onClick={toggleSidebar}
        >
            <InfoIcon />
        </button>
    );
}
