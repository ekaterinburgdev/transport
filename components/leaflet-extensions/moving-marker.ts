import L from 'leaflet';

export class MovingMarker extends L.Marker {
    private slideToUntil = 0;

    private slideToDuration = 1000;

    private slideToLatLng: L.LatLngExpression = [0, 0];

    private slideFromLatLng: L.LatLngExpression = [0, 0];

    private animationId: number;

    moveToWithDuration({ latlng, duration }: { latlng: L.LatLng; duration: number }) {
        this.slideFromLatLng = this.getLatLng();
        this.slideToLatLng = latlng;
        this.slideToDuration = duration;
        this.slideToUntil = performance.now() + this.slideToDuration;

        this.moveToWithDurationAnim();
    }

    private moveToWithDurationAnim = () => {
        const timeRemains = this.slideToUntil - performance.now();

        if (timeRemains <= 0) {
            this.setLatLng(this.slideToLatLng);

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

        this.animationId = null;
    }

    // Template for method to use in MapVehicleItem

    // moveToWithSpeed({
    //     latlng,
    //     speed,
    //     acceleration,
    //     direction,
    // }: {
    //     latlng: L.LatLng;
    //     speed: number;
    //     acceleration?: number;
    //     direction?: number;
    // }) {

    // }
}
