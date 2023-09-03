function getMinutesToFutureTime(time: Date) {
    const now = new Date();

    return Math.max(Math.round((time.getTime() - now.getTime()) / 1000 / 60), 0);
}

export function getTimeToArrive(arriveTime: string) {
    const [hours, minutes] = arriveTime.split(':');

    const arriveDate = new Date();
    arriveDate.setHours(parseInt(hours, 10));
    arriveDate.setMinutes(parseInt(minutes, 10));

    const now = new Date();

    if (arriveDate.getHours() === 0 && now.getHours() === 23) {
        arriveDate.setDate(now.getDate() + 1);
    }

    return getMinutesToFutureTime(arriveDate);
}
