import React, { Component, createRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { isEqual } from 'lodash';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import classNames from 'classnames/bind';

import { withMap } from 'components/Map/hocs/withMap';

import { sidebarService } from 'services/sidebar/sidebar';

import { MapVehicleMarker } from '../Marker/MapVehicleMarker';
import { MapVehiclesSidebar } from '../Sidebar/MapVehiclesSidebar';

import { startMoveInDirection, clearIntervals } from './MapVehiclesItem.utils';
import { EAST_COURSE_RANGE } from './MapVehiclesItem.constants';
import { MapVehiclesItemProps } from './MapVehiclesItem.types';

import styles from './MapVehiclesItem.module.css';

const cn = classNames.bind(styles);

export class MapVehiclesItemComponent extends Component<MapVehiclesItemProps> {
    private icon: L.DivIcon;

    private markerRef = createRef<L.Marker>();

    private isActive = false;

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

    componentWillUnmount(): void {
        clearIntervals();
    }

    getIcon() {
        const {
            boardId, routeNumber, course, type, disability, warning,
        } = this.props;
        const isCourseEast = course > EAST_COURSE_RANGE.left || course < EAST_COURSE_RANGE.right;

        return new L.DivIcon({
            iconSize: [33, 28],
            iconAnchor: [16.5, 14],
            popupAnchor: [0, -14],
            className: `${cn(styles.MapVehicle)}`,
            html: ReactDOMServer.renderToStaticMarkup(
                <MapVehicleMarker
                    boardId={boardId}
                    routeNumber={routeNumber}
                    type={type}
                    disability={disability}
                    warning={warning}
                    isCourseEast={isCourseEast}
                    course={course}
                />,
            ),
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

        if (!this.isActive) {
            this.isActive = true;
            sidebarService.open(<MapVehiclesSidebar {...this.props} />, () => {
                this.isActive = false;
            });
        }
    };

    private updateTranslate = () => {
        const {
            boardId, routeNumber, velocity, course,
        } = this.props;

        const marker = document.querySelector(
            `#vehicle-${boardId}-${routeNumber}`,
        ) as HTMLDivElement;

        if (!marker) {
            return;
        }

        startMoveInDirection({
            direction: course,
            vehicle: marker,
            velocity,
            scale: this.getScale(),
        });
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
