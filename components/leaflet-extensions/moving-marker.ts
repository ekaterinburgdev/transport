import L from 'leaflet';

export const ANIMATION_INTERVAL = 50;
export const METERS_IN_KILOMETER = 1000;
export const SECONDS_IN_HOUR = 3600;

function round(num: number, decimalPlaces: number = 0) {
    const multyplier = 10 ** decimalPlaces;

    return Math.round((num + Number.EPSILON) * multyplier) / multyplier;
}

function getDeltaCoords(velocity: number, course: number, animInterval = ANIMATION_INTERVAL) {
    const distance = (velocity * animInterval) / 1000;
    const angleInRad = (course * Math.PI) / 180;

    // Calculating cathets (x and y) from hypotenuse (distance)
    return [round(Math.cos(angleInRad) * distance, 5), round(Math.sin(angleInRad) * distance, 5)];
}

function getVelocityInPixelsPerSecond(velocity: number, scale: number) {
    const velocityMetersPerSecond = (velocity * METERS_IN_KILOMETER) / SECONDS_IN_HOUR;

    return velocityMetersPerSecond / scale;
}

export class MovingMarker extends L.Marker {
    private slideToUntil = 0;

    private slideToDuration = 1000;

    private slideToLatLng: L.LatLngExpression = [0, 0];

    private slideFromLatLng: L.LatLngExpression = [0, 0];

    private slideSpeed = 0;

    private slideDirection = 0;

    private animationId: number;

    private prevTime = 0;

    private inertialMove;

    moveToWithDuration({
        latlng,
        duration,
        inertialMove,
    }: {
        latlng: L.LatLng;
        duration: number;
        inertialMove?: {
            speed: number;
            direction: number;
            callback?: () => void;
        };
    }) {
        this.slideFromLatLng = this.getLatLng();
        this.slideToLatLng = latlng;
        this.slideToDuration = duration;
        this.slideToUntil = performance.now() + this.slideToDuration;
        this.inertialMove = inertialMove;

        this.moveToWithDurationAnim();
    }

    private moveToWithDurationAnim = () => {
        const timeRemains = this.slideToUntil - performance.now();

        // eslint-disable-next-line no-underscore-dangle
        if (timeRemains <= 0 || !this._map) {
            this.setLatLng(this.slideToLatLng);

            if (this.inertialMove) {
                const { callback, ...moveWithSpeedOptions } = this.inertialMove;

                if (callback) {
                    callback();
                }

                this.moveToWithSpeed(moveWithSpeedOptions);

                this.inertialMove = null;
            }

            this.animationId = null;

            return;
        }

        // eslint-disable-next-line no-underscore-dangle
        const startPoint = this._map.latLngToContainerPoint(this.slideFromLatLng);
        // eslint-disable-next-line no-underscore-dangle
        const endPoint = this._map.latLngToContainerPoint(this.slideToLatLng);

        const progress = (this.slideToDuration - timeRemains) / this.slideToDuration;
        const currentPos = endPoint.multiplyBy(progress).add(startPoint.multiplyBy(1 - progress));

        // eslint-disable-next-line no-underscore-dangle
        this.setLatLng(this._map.containerPointToLatLng(currentPos));

        this.animationId = L.Util.requestAnimFrame(this.moveToWithDurationAnim);
    };

    cancelMove() {
        L.Util.cancelAnimFrame(this.animationId);

        this.slideFromLatLng = null;
        this.slideToLatLng = null;
        this.animationId = null;
        this.prevTime = 0;
        this.inertialMove = null;
    }

    private getScale() {
        // eslint-disable-next-line no-underscore-dangle
        if (!this._map) {
            return 1;
        }

        // Get the x, y dimensions of the map
        // eslint-disable-next-line no-underscore-dangle
        const { x, y } = this._map.getSize();

        // calculate the distance the one side of the map to the other using the haversine formula
        // eslint-disable-next-line no-underscore-dangle
        const maxMeters = this._map
            .containerPointToLatLng([0, y])
            // eslint-disable-next-line no-underscore-dangle
            .distanceTo(this._map.containerPointToLatLng([x, y]));

        // calculate how many meters each pixel represents
        return maxMeters / x;
    }

    public getMap() {
        // eslint-disable-next-line no-underscore-dangle
        return this._map;
    }

    moveToWithSpeed({ speed, direction }: { speed: number; direction: number }) {
        this.slideSpeed = speed;
        this.slideDirection = direction;

        // eslint-disable-next-line no-underscore-dangle
        if (!this._map) {
            return;
        }

        this.moveToWithSpeedAnim();
    }

    private moveToWithSpeedAnim = () => {
        // eslint-disable-next-line no-underscore-dangle
        if (!this._map) {
            return;
        }

        const currentTime = performance.now();
        const timeDiff = currentTime - this.prevTime;

        const velocityPxPerSecond = getVelocityInPixelsPerSecond(this.slideSpeed, this.getScale());
        const [deltaX, deltaY] = getDeltaCoords(velocityPxPerSecond, this.slideDirection, timeDiff);

        // eslint-disable-next-line no-underscore-dangle
        const currentPosition = this._map.options.crs
            .latLngToPoint(
                this.getLatLng(),
                // eslint-disable-next-line no-underscore-dangle
                this._map.getZoom(),
            )
            // eslint-disable-next-line no-underscore-dangle
            .subtract(this._map.getPixelOrigin());
        const nextPosition = currentPosition.add([deltaX, deltaY]);

        // eslint-disable-next-line no-underscore-dangle
        this.setLatLng(this._map.layerPointToLatLng(nextPosition));

        this.prevTime = currentTime;
        this.animationId = L.Util.requestAnimFrame(this.moveToWithSpeedAnim);
    };
}
