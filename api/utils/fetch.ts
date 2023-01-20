import { HttpMethod, FetchOptions } from 'common/types/requests';

import { getCorsWrapper } from './get-cors-wrapper';

export async function fetchApi(url: string, options: FetchOptions) {
    const { method = HttpMethod.GET, dataField } = options;

    try {
        const res = await fetch(url, {
            method,
        });

        const resJson = await res.json();

        if (resJson.error?.status) {
            const e = new Error(resJson.error.msg);

            console.error(e);

            throw e;
        }

        if (!(dataField in resJson)) {
            const e = new Error(`No data field ${dataField} in API response`);

            console.error(e);

            throw e;
        }

        return resJson[dataField];
    } catch (e) {
        console.error(e);

        throw e;
    }
}

export async function fetchInternalApi(url: string, options: FetchOptions) {
    return fetchApi(getCorsWrapper(url), options);
}
