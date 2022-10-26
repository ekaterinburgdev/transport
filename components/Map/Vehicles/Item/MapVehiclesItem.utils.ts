export const getDistanceInPixels = (seconds: number, velocity: number, scale: number) => {
    const fixedVelocity = velocity;

    const velocityMetersPerSecond = fixedVelocity / 3.6;
    const velocityPixelsPerSecond = velocityMetersPerSecond / scale;

    return seconds * velocityPixelsPerSecond;
};

export const getDistanceInPixels2 = (ms: number, velocity: number, scale: number) => {
    const fixedVelocity = velocity * 0.9;

    const velocityMetersPerMs = fixedVelocity / 3600;
    const velocityPixelsPerMs = velocityMetersPerMs / scale;
    // console.log(ms, velocityPixelsPerMs);

    return ms * velocityPixelsPerMs;
};

export const getDeltaCoords = (velocity: number, scale: number, course: number) => {
    const distance = getDistanceInPixels(9, velocity, scale);
    const angleInRad = (course * Math.PI) / 180;

    return [Math.cos(angleInRad) * distance, Math.sin(angleInRad) * distance];
};

export const getDeltaCoords2 = (velocity: number, scale: number, course: number) => {
    // console.log(scale);
    const distance = getDistanceInPixels2(100, velocity, scale);
    const angleInRad = (course * Math.PI) / 180;

    return [Math.cos(angleInRad) * distance, Math.sin(angleInRad) * distance];
};
