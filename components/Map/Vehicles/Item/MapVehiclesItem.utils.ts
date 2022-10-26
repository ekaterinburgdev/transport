const getDistanceInPixels = (seconds: number, velocity: number, scale: number) => {
    const fixedVelocity = velocity;

    const velocityMetersPerSecond = fixedVelocity / 3.6;
    const velocityPixelsPerSecond = velocityMetersPerSecond / scale;

    return seconds * velocityPixelsPerSecond;
};

export const getDeltaCoords = (velocity: number, scale: number, course: number) => {
    const distance = getDistanceInPixels(9, velocity, scale);
    const angleInRad = (course * Math.PI) / 180;

    return [Math.cos(angleInRad) * distance, Math.sin(angleInRad) * distance];
};
