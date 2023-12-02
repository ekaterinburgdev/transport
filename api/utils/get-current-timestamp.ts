let lastTimestamp = 0;

export function getCurrentTimestamp() {
    let timestamp = Math.floor((new Date).getTime() / 1000);

    if (timestamp <= lastTimestamp) {
        timestamp++;
    }

    lastTimestamp = timestamp;
    return timestamp;
}
