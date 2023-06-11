export async function parallelRequests<T, R>(
    jobs: Promise<T>[],
    concatenator: (result: T) => Promise<R[]>,
) {
    const rawResults = await Promise.all(jobs);

    const result: R[] = [];

    for (const rawResult of rawResults) {
        const dataToConcat = await concatenator(rawResult);
        result.push(...dataToConcat);
    }

    return result;
}
