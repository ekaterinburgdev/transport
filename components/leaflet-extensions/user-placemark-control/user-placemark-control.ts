import L from 'leaflet';
import classNames from 'classnames/bind';

import { MovingMarker } from '../moving-marker';
import { MARGIN_OF_EQUALS_ERROR } from './user-placemark-control.constants';
import { UserPlacemarkControlState } from './user-placemark-control.types';

import styles from './user-placemark-control.module.css';

const cn = classNames.bind(styles);

export class UserPlacemarkControl extends L.Control {
    private state: UserPlacemarkControlState = UserPlacemarkControlState.Free;

    private userPlacemark: MovingMarker;

    private map: L.Map;

    constructor(userPlacemark: MovingMarker, options: L.ControlOptions) {
        super(options);

        this.userPlacemark = userPlacemark;
    }

    onRemove(): void {
        this.userPlacemark?.removeEventListener('move', this.moveMapCenter);
    }

    onAdd(map: L.Map) {
        this.map = map;
        const container = L.DomUtil.create('div', cn(styles.UserPlacemarkControl));

        const button = L.DomUtil.create('button', cn(styles.UserPlacemarkControlButton), container);

        button.innerHTML = `
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.4291 18.251C19.9529 17.9532 20.3767 17.507 20.6472 16.9687C20.9177 16.4303 21.0227 15.8239 20.949 15.2259C20.8753 14.6279 20.6261 14.0652 20.2329 13.6086C19.8397 13.1521 19.3202 12.8222 18.7397 12.6606C18.1593 12.499 17.5441 12.5129 16.9715 12.7005C16.399 12.8882 15.8948 13.2412 15.5227 13.715C15.1505 14.1888 14.927 14.7622 14.8803 15.3629C14.8337 15.9636 14.9659 16.5647 15.2605 17.0903C15.6602 17.7961 16.3235 18.3145 17.1049 18.5321C17.8863 18.7497 18.7221 18.6486 19.4291 18.251ZM17.9499 31.5L10.0231 23.5874C8.46195 22.0254 7.39825 20.0361 6.96615 17.8703C6.53404 15.7046 6.75288 13.4594 7.5951 11.4178C8.43732 9.37629 9.86518 7.62985 11.6986 6.39873C13.5321 5.16761 15.689 4.50695 17.8974 4.50005C20.1059 4.49316 22.2669 5.14034 24.108 6.35999C25.9491 7.57963 27.3879 9.31713 28.2428 11.3534C29.0978 13.3896 29.3306 15.6334 28.912 17.8018C28.4935 19.9702 27.4422 21.9661 25.8908 23.5379L17.9499 31.5ZM17.9499 27.1615L23.7251 21.3863C24.8555 20.2491 25.6238 18.8025 25.933 17.2292C26.2423 15.6558 26.0786 14.0261 25.4628 12.5456C24.8469 11.0652 23.8064 9.80022 22.4725 8.91039C21.1386 8.02056 19.5711 7.5457 17.9676 7.5457C16.3641 7.5457 14.7965 8.02056 13.4626 8.91039C12.1287 9.80022 11.0882 11.0652 10.4724 12.5456C9.85653 14.0261 9.69289 15.6558 10.0021 17.2292C10.3114 18.8025 11.0797 20.2491 12.2101 21.3863L17.9499 27.1969V27.1615Z" fill="currentColor"/>
            </svg>
        `;

        L.DomEvent.on(button, 'click', () => this.onClick(container), this);

        this.map.addEventListener('drag', () => {
            this.setFreeState(container);
            this.userPlacemark?.removeEventListener('move', this.moveMapCenter);
        });

        if (this.userPlacemark) {
            this.updateStateByUserPlacemark(container);
        }

        return container;
    }

    private updateStateByUserPlacemark(control: HTMLDivElement) {
        if (this.map.getCenter().equals(this.userPlacemark?.getLatLng(), MARGIN_OF_EQUALS_ERROR)) {
            this.setCenteredState(control);
        } else {
            this.setFreeState(control);
        }
    }

    private setCenteredState(control: HTMLDivElement) {
        if (this.state === UserPlacemarkControlState.Centered) {
            return;
        }

        this.state = UserPlacemarkControlState.Centered;
        control.classList.add(cn(styles.UserPlacemarkControlCentered));

        this.userPlacemark?.addEventListener('move', this.moveMapCenter);
    }

    private setFreeState(control: HTMLDivElement) {
        if (this.state === UserPlacemarkControlState.Free) {
            return;
        }

        this.state = UserPlacemarkControlState.Free;
        control.classList.remove(cn(styles.UserPlacemarkControlCentered));
    }

    private moveMapCenter = () => {
        this.map.setView(this.userPlacemark?.getLatLng());
    };

    private onClick(control: HTMLDivElement) {
        if (this.state === UserPlacemarkControlState.Free) {
            this.moveMapCenter();

            this.setCenteredState(control);
        }
    }
}
