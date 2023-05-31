import React, { Dispatch, SetStateAction, ReactElement } from 'react';

import { Modal } from 'components/UI/Modal/Modal';

class SidebarService {
    setSidebar: Dispatch<SetStateAction<ReactElement>>;

    private component: ReactElement = null;

    private onClose: VoidFunction;

    readonly open = ({
        component,
        onClose,
    }: {
        component: ReactElement;
        onClose?: VoidFunction;
    }) => {
        this.close();
        this.onClose = onClose;
        this.component = <Modal>{component}</Modal>;
        this.setSidebar?.(this.component);
    };

    readonly close = () => {
        if (this.component !== null) {
            this.onClose?.();
            this.component = null;
            this.setSidebar?.(null);
        }
    };
}

export const sidebarService = new SidebarService();
