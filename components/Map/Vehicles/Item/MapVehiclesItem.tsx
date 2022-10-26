import React, { Component, createRef } from 'react';
import { isEqual } from 'lodash';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import classNames from 'classnames/bind';

import { withMap } from 'components/hocs/withMap';

import { getDeltaCoords } from './MapVehiclesItem.utils';

import styles from './MapVehiclesItem.module.css';

const cn = classNames.bind(styles);

export type MapVehiclesItemProps = {
    iconUrl: string;
    arrowUrl: string;
    boardId: number;
    velocity: number;
    position: [number, number];
    routeNumber: number | null;
    course: number;
    color: string;
    onClick: (routeNumber: number) => void;
    map: L.Map;
};

export type MapVehiclesItemState = {};

const leftRoutePanelStyle = 'left: -19px; text-align: left;';

export class MapVehiclesItemComponent extends Component<
MapVehiclesItemProps,
MapVehiclesItemState
> {
    private icon: L.DivIcon;

    private markerRef = createRef<L.Marker>();

    constructor(props: MapVehiclesItemProps) {
        super(props);

        this.icon = this.getIcon();
    }

    componentDidMount(): void {
        setTimeout(this.updateTranslate, 0);

        const { map } = this.props;

        map.addEventListener('zoomend', () => {
            this.updateTranslate();
        });
    }

    componentDidUpdate(prevProps: Readonly<MapVehiclesItemProps>): void {
        const { course, position } = this.props;

        if (prevProps.course !== course) {
            const icon = this.getIcon();

            this.markerRef?.current?.setIcon(icon);
        }

        if (!isEqual(prevProps.position, position)) {
            this.updateTranslate();
        }
    }

    getIcon() {
        const {
            boardId, routeNumber, course, color, arrowUrl, iconUrl,
        } = this.props;
        const isCourseEast = course > 315 || course < 45;

        return new L.DivIcon({
            iconSize: [37, 32],
            iconAnchor: [18.5, 16],
            popupAnchor: [0, -16],
            className: `${cn(styles.MapVehicle)}`,
            html: `
                <div
                    class="vehicle-${boardId}-${routeNumber} ${cn(styles.MapVehicleWrapper)}"
                    style="transform: translate(0px, 0px)"
                >
                    <div
                        style="color: ${color}; ${isCourseEast ? leftRoutePanelStyle : ''}"
                        class="${cn(styles.MapVehicleRoute)}"
                    >
                        ${routeNumber}
                    </div>
                    <img
                        id="vehicle-icon-${boardId}-${routeNumber}"
                        style="transform: rotate(${course}deg); transform-origin: 16px 16px"
                        class="${cn(styles.MapVehicleArrow)}"
                        src="${arrowUrl}"
                    />
                    <img
                        class="${cn(styles.MapVehicleIcon)}"
                        src="${iconUrl}"
                    />
                </div>
            `,
        });
    }

    getScale = () => {
        const { map } = this.props;

        // Get the y,x dimensions of the map
        const { x, y } = map.getSize();

        // calculate the distance the one side of the map to the other using the haversine formula
        const maxMeters = map
            .containerPointToLatLng([0, y])
            .distanceTo(map.containerPointToLatLng([x, y]));

        // calculate how many meters each pixel represents
        return maxMeters / x;
    };

    onClickEventHandler = () => {
        const { routeNumber, onClick } = this.props;

        if (!routeNumber) {
            return;
        }

        onClick(routeNumber);
    };

    updateTranslate = () => {
        const {
            boardId, routeNumber, velocity, course,
        } = this.props;

        const marker = document.querySelector(
            `.vehicle-${boardId}-${routeNumber}`,
        ) as HTMLDivElement;

        if (!marker) {
            return;
        }

        const [x, y] = getDeltaCoords(velocity, this.getScale(), course);

        marker.style.transform = `translate(${x}px, ${y}px)`;
    };

    render() {
        const { position } = this.props;

        return (
            <Marker
                icon={this.icon}
                position={position}
                eventHandlers={{ click: this.onClickEventHandler }}
                ref={this.markerRef}
            />
        );
    }
}

export const MapVehiclesItem = withMap(MapVehiclesItemComponent);
