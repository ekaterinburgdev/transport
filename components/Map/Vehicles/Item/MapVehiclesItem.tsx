import React, { Component, createRef } from 'react';
import { isEqual } from 'lodash';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import classNames from 'classnames/bind';
import 'leaflet.marker.slideto';

import { VehicleType } from '../../Transport/MapTransport';

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
    type: VehicleType;
    map: L.Map;
};

export type MapVehiclesItemState = {}

const leftRoutePanelStyle = 'left: -19px; text-align: left;';

export class MapVehiclesItemComponent extends Component<MapVehiclesItemProps, MapVehiclesItemState> {
    private icon: L.DivIcon;
    private position: L.LatLngExpression;
    private markerRef = createRef<L.Marker>();

    constructor(props: MapVehiclesItemProps) {
        super(props);

        this.icon = this.getIcon();
    }
    
    getIcon(props?: MapVehiclesItemProps) {
        const { boardId, routeNumber, course, color, arrowUrl, iconUrl } = props || this.props;
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
    }

    updateTranslate = (props?: MapVehiclesItemProps) => {
        const { boardId, routeNumber, velocity, course } = props || this.props;

        const marker = document.querySelector(`.vehicle-${boardId}-${routeNumber}`) as HTMLDivElement;

        if (!marker) {
            return;
        }

        const [x, y] = getDeltaCoords(velocity, this.getScale(), course);

        console.log(marker.style.transform);

        marker.style.transform = `translate(${x}px, ${y}px)`;
    }

    componentDidMount(): void {
        setTimeout(this.updateTranslate, 0);
        
        this.props.map.addEventListener('zoomend', () => {
            this.updateTranslate();
        });
    }

    componentDidUpdate(prevProps: Readonly<MapVehiclesItemProps>, prevState: Readonly<MapVehiclesItemState>, snapshot?: any): void {
        if (prevProps.course !== this.props.course) {
            const icon = this.getIcon();

            this.markerRef?.current?.setIcon(icon);
        }

        if (!isEqual(prevProps.position, this.props.position)) {
            this.updateTranslate();
        }
    }

    render() {
        return (
            <Marker
                icon={this.icon}
                position={this.props.position}
                eventHandlers={{ click: this.onClickEventHandler }}
                ref={this.markerRef}
            />
        )
    }
};

function withMap(Component) {
    return function WrappedComponent(props) {
      const map = useMap();

      return <Component {...props} map={map} />;
    };
}

export const MapVehiclesItem = withMap(MapVehiclesItemComponent);
  