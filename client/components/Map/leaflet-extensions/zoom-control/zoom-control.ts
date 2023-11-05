import L from 'leaflet';
import classNames from 'classnames/bind';

import styles from './zoom-control.module.css';

const cn = classNames.bind(styles);

export class ZoomControl extends L.Control.Zoom {
    onAdd() {
        const container = L.DomUtil.create('div', cn(styles.ZoomControl));

        L.DomEvent.disableClickPropagation(container);
        // TS tells that those buttons do not exist in ZoomControl
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        this._zoomInButton = this.createButton('in', container);
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        this._zoomOutButton = this.createButton('out', container);

        return container;
    }

    private createButton(type: string, container: HTMLElement) {
        const className = `ZoomControl_${type}`;
        const button = L.DomUtil.create('button', cn(styles.ZoomControlButton), container);
        const buttonIcon = L.DomUtil.create('img', cn(styles[className]), button);

        buttonIcon.src = `/icons/zoom-${type}.svg`;
        buttonIcon.alt = `Zoom ${type} button`;

        // TS tells that those methods do not exist in ZoomControl
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        L.DomEvent.on(button, 'click', type === 'in' ? this._zoomIn : this._zoomOut, this);

        return button;
    }
}
