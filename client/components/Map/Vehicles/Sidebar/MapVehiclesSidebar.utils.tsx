import React from 'react';
import { Station } from './mocks/stations';

// FIXME: for 00:00
export const isNowLessArrival = (station: Station) => {
    const now = new Date();
    const nowMinutes = now.getMinutes();
    const nowHours = now.getHours();
    const [arrivalHours, arrivalMinutes] = station.arrivalTime.split(':').map(Number);
    return nowHours < arrivalHours || (nowHours === arrivalHours && nowMinutes < arrivalMinutes);
};

export const getPointsRow = (pointsCount: number) =>
    '.'
        .repeat(Math.min(pointsCount, 10))
        .split('')
        .map((point) => <span>{point}</span>);
