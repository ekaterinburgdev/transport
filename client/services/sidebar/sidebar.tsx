import React, { Dispatch, SetStateAction, ReactElement } from 'react';

import { Sidepage } from 'components/UI/Sidepage/Sidepage';

class SidebarService {
    static instance = null;

    setSidebar: Dispatch<SetStateAction<ReactElement>>;

    private component: ReactElement = null;
    private onClose: VoidFunction;

    constructor() {
        if (SidebarService.instance) {
            return SidebarService.instance;
        }

        SidebarService.instance = this;
    }

    readonly open = ({
        component,
        onClose,
    }: {
        component: ReactElement;
        onClose?: VoidFunction;
    }) => {
        this.onClose = onClose;
        this.component = <Sidepage>{component}</Sidepage>;
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
