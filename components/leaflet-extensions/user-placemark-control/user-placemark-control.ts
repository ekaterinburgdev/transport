import L from 'leaflet';
import classNames from 'classnames/bind';

import { MovingMarker } from '../moving-marker';
import { MARGIN_OF_EQUALS_ERROR } from './user-placemark-control.constants';
import { UserPlacemarkControlState, UserPlacemarkIcons } from './user-placemark-control.types';

import styles from './user-placemark-control.module.css';

const cn = classNames.bind(styles);

export class UserPlacemarkControl extends L.Control {
    private state: UserPlacemarkControlState = UserPlacemarkControlState.Free;

    private userPlacemark: MovingMarker;

    constructor(userPlacemark: MovingMarker, options: L.ControlOptions) {
        super(options);

        this.userPlacemark = userPlacemark;
    }

    onAdd(map: L.Map) {
        const container = L.DomUtil.create('div', cn(styles.UserPlacemarkControl));

        const button = L.DomUtil.create('button', cn(styles.UserPlacemarkControlButton), container);

        const buttonIcon = L.DomUtil.create(
            'img',
            `${cn(styles.UserPlacemarkControlIcon)} ${cn(styles.UserPlacemarkControlIcon_active)}`,
            button,
        );
        const buttonIconCentered = L.DomUtil.create(
            'img',
            cn(styles.UserPlacemarkControlIcon),
            button,
        );

        buttonIcon.src = '/icons/user-placemark-control.svg';
        buttonIcon.alt = 'User placemark control';

        buttonIconCentered.src = '/icons/user-placemark-control-centered.svg';
        buttonIconCentered.alt = 'User placemark cenetered control';

        L.DomEvent.on(
            button,
            'click',
            () => this.onClick(map, container, { buttonIcon, buttonIconCentered }),
            this,
        );

        map.addEventListener('drag', () => {
            this.updateStateByUserPlacemark(map, container, { buttonIcon, buttonIconCentered });
        });

        this.userPlacemark?.addEventListener('move', () => {
            this.updateStateByUserPlacemark(map, container, { buttonIcon, buttonIconCentered });
        });

        if (this.userPlacemark) {
            this.updateStateByUserPlacemark(map, container, { buttonIcon, buttonIconCentered });
        }

        return container;
    }

    private updateStateByUserPlacemark(
        map: L.Map,
        control: HTMLDivElement,
        icons: UserPlacemarkIcons,
    ) {
        if (map.getCenter().equals(this.userPlacemark?.getLatLng(), MARGIN_OF_EQUALS_ERROR)) {
            this.setCenteredState(control, icons);
        } else {
            this.setFreeState(control, icons);
        }
    }

    private setCenteredState(control: HTMLDivElement, icons: UserPlacemarkIcons) {
        this.state = UserPlacemarkControlState.Centred;

        control.classList.add(cn(styles.UserPlacemarkControlCentered));
        icons.buttonIconCentered.classList.add(cn(styles.UserPlacemarkControlIcon_active));
        icons.buttonIcon.classList.remove(cn(styles.UserPlacemarkControlIcon_active));
    }

    private setFreeState(control: HTMLDivElement, icons: UserPlacemarkIcons) {
        this.state = UserPlacemarkControlState.Free;

        control.classList.remove(cn(styles.UserPlacemarkControlCentered));
        icons.buttonIcon.classList.add(cn(styles.UserPlacemarkControlIcon_active));
        icons.buttonIconCentered.classList.remove(cn(styles.UserPlacemarkControlIcon_active));
    }

    private onClick(map: L.Map, control: HTMLDivElement, icons: UserPlacemarkIcons) {
        if (this.state === UserPlacemarkControlState.Free) {
            map.setView(this.userPlacemark?.getLatLng());

            this.setCenteredState(control, icons);
        }
    }
}
