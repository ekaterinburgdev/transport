export async function runParallelJobs<T, R>(
    args: T[],
    job: (args: T) => Promise<R>,
    maxRequests = 10,
): Promise<R[]> {
    return new Promise((resolve, reject) => {
        const result: R[] = [];

        let currentRequest = 0;
        let activeRequests = 0;

        async function requestNextRoute() {
            if (currentRequest >= args.length) {
                return;
            }

            const currentArg = args[currentRequest++];

            console.log(`Requesting ${currentRequest - 1} request`);
            try {
                activeRequests++;
                const requestResult = await job(currentArg);
                finishJob(requestResult, currentRequest);
            } catch (e) {
                reject(e);

                return;
            }
        }

        function finishJob(requestResult: R, currentRequest: number) {
            result.push(requestResult);
            activeRequests--;
            console.log(`Finish requesting ${currentRequest - 1} request`);

            if (currentRequest >= args.length && !activeRequests) {
                console.log('Finished all requests');
                resolve(result);

                return;
            }

            requestNextRoute();
        }

        while (currentRequest < Math.min(maxRequests, args.length)) {
            const currentArg = args[currentRequest++];
            console.log(`Requesting ${currentRequest - 1} request`);

            activeRequests++;
            job(currentArg)
                .then((requestResult) => {
                    finishJob(requestResult, currentRequest);
                })
                .catch(reject);
        }
    });
}
