import { ANIMATION_INTERVAL } from './MapVehiclesItem.constants';

const intervalById: {
    [id: number]: number;
} = {};

function round(num: number) {
    return Math.round((num + Number.EPSILON) * 10000) / 10000;
}

function getDeltaCoords(velocity: number, course: number) {
    const distance = (velocity * ANIMATION_INTERVAL) / 1000;
    const angleInRad = (course * Math.PI) / 180;

    return [round(Math.cos(angleInRad) * distance), round(Math.sin(angleInRad) * distance)];
}

function getVelocityInPixelsPerSecond(velocity: number, scale: number) {
    const velocityMetersPerSecond = (velocity * 1000) / 3600;

    return velocityMetersPerSecond / scale;
}

function moveInDirection(direction: number, vehicle: HTMLElement, velocity: number, scale: number) {
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

export function startMoveInDirection(
    direction: number,
    vehicle: HTMLElement,
    velocity: number,
    scale: number,
) {
    if (intervalById[vehicle.id]) {
        clearInterval(intervalById[vehicle.id]);
    }

    intervalById[vehicle.id] = setInterval(
        () => moveInDirection(direction, vehicle, velocity, scale),
        ANIMATION_INTERVAL,
    );
}

export function clearIntervals() {
    Object.entries(intervalById).forEach(([id, interval]) => {
        clearInterval(interval);

        delete intervalById[id];
    });
}
