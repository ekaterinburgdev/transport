export const getHHMMFormat = (date: Date) => {
    const padStartZero = (value: number) => value.toString().padStart(2, '0');
    return `${padStartZero(date.getHours())}:${padStartZero(date.getMinutes())}`;
};
