import React from 'react';

export const getPointsRow = (pointsCount: number) =>
    '.'
        .repeat(Math.min(pointsCount, 10))
        .split('')
        .map((point) => <span>{point}</span>);
