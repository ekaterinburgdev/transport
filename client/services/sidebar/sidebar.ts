import { Dispatch, SetStateAction, ReactElement } from 'react';

class SidebarService {
    setSidebar: Dispatch<SetStateAction<ReactElement>>;

    private component: ReactElement = null;

    private onClose: VoidFunction;

    readonly open = (component: ReactElement, onClose?: VoidFunction) => {
        this.close();
        this.onClose = onClose;
        this.component = component;
        this.setSidebar?.(component);
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
