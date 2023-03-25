import {
    ANIMATION_INTERVAL,
    METERS_IN_KILOMETER,
    SECONDS_IN_HOUR,
} from './MapVehiclesItem.constants';
import { MoveInDirectionParams } from './MapVehiclesItem.types';

const intervalById: {
    [id: number]: number;
} = {};

function round(num: number, decimalPlaces: number = 0) {
    const multyplier = 10 ** decimalPlaces;

    return Math.round((num + Number.EPSILON) * multyplier) / multyplier;
}

function getDeltaCoords(velocity: number, course: number) {
    const distance = (velocity * ANIMATION_INTERVAL) / 1000;
    const angleInRad = (course * Math.PI) / 180;

    // Calculating cathets (x and y) from hypotenuse (distance)
    return [round(Math.sin(angleInRad) * distance, 4), -round(Math.cos(angleInRad) * distance, 4)];
}

function getVelocityInPixelsPerSecond(velocity: number, scale: number) {
    const velocityMetersPerSecond = (velocity * METERS_IN_KILOMETER) / SECONDS_IN_HOUR;

    return velocityMetersPerSecond / scale;
}

function moveInDirection({ direction, vehicle, velocity, scale }: MoveInDirectionParams) {
    const currentCoords = vehicle.style.transform.match(
        /translate3d\((-?[.0-9]+)px, (-?[.0-9]+)px, 0px\)/,
    );

    let x = currentCoords ? Number(currentCoords[1]) : 0;
    let y = currentCoords ? Number(currentCoords[2]) : 0;

    const velocityPxPerSecond = getVelocityInPixelsPerSecond(velocity, scale);
    const [deltaX, deltaY] = getDeltaCoords(velocityPxPerSecond, direction);

    x += deltaX;
    y += deltaY;

    vehicle.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
}

export function startMoveInDirection({
    direction,
    vehicle,
    velocity,
    scale,
}: MoveInDirectionParams) {
    if (intervalById[vehicle.id]) {
        clearInterval(intervalById[vehicle.id]);
    }

    intervalById[vehicle.id] = setInterval(
        () =>
            moveInDirection({
                direction,
                vehicle,
                velocity,
                scale,
            }),
        ANIMATION_INTERVAL,
    );
}

export function clearIntervals() {
    Object.entries(intervalById).forEach(([id, interval]) => {
        clearInterval(interval);

        delete intervalById[id];
    });
}
