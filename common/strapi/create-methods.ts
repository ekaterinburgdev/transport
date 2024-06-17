import { StrapiContentTypes } from '../types/strapi';
import { parallelRequests } from '../utils/parallelRequests';
import { STRAPI_URL, REQUEST_PAGINATION_SIZE } from './constants';

export function createStrapiMethods(contentType: StrapiContentTypes, jwt?: string) {
    const requestToStrapiOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
        },
    };

    async function publish<T>(data: T) {
        try {
            const resp = await fetch(`${STRAPI_URL}/api/${contentType}s`, {
                ...requestToStrapiOptions,
                method: 'POST',
                body: JSON.stringify({
                    data,
                }),
            });

            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }

            const body = (await resp.json()) as any;

            if (body.error) {
                throw new Error(JSON.stringify(body.error));
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function update<T extends { id: number }>(data: T) {
        try {
            const { id, ...attributes } = data;
            const resp = await fetch(`${STRAPI_URL}/api/${contentType}s/${id}`, {
                method: 'PUT',
                ...requestToStrapiOptions,
                body: JSON.stringify({
                    data: attributes,
                }),
            });

            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }

            const body = (await resp.json()) as any;

            if (body.error) {
                throw new Error(JSON.stringify(body.error));
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function deleteById(id: number) {
        try {
            const resp = await fetch(`${STRAPI_URL}/api/${contentType}s/${id}`, {
                method: 'DELETE',
                ...requestToStrapiOptions,
            });

            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }

            const body = (await resp.json()) as any;

            if (body.error) {
                throw new Error(JSON.stringify(body.error));
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function getAll<R>(filter?: string, withImage: boolean = false): Promise<R[]> {
        try {
            const sizeRequest = await fetch(
                `${STRAPI_URL}/api/${contentType}s?pagination[pageSize]=1${
                    filter ? '&' + filter : ''
                }`,
                requestToStrapiOptions,
            );

            if (sizeRequest.status !== 200) {
                throw new Error(sizeRequest.statusText);
            }

            const sizeRequestBody = (await sizeRequest.json()) as any;

            if (sizeRequestBody.error) {
                throw new Error(JSON.stringify(sizeRequestBody.error));
            }

            const pageCount = Math.ceil(
                sizeRequestBody?.meta?.pagination?.total / REQUEST_PAGINATION_SIZE,
            );

            const requests = [];

            for (let i = 1; i <= pageCount; i++) {
                requests.push(
                    fetch(
                        `${STRAPI_URL}/api/${contentType}s?pagination[page]=${i}&pagination[pageSize]=${REQUEST_PAGINATION_SIZE}${
                            withImage ? '&populate=image' : ''
                        }${filter ? '&' + filter : ''}`,
                        requestToStrapiOptions,
                    ),
                );
            }

            const response = await parallelRequests<Response, R>(requests, async (rawResult) => {
                if (rawResult.status !== 200) {
                    throw new Error(rawResult.statusText);
                }

                const result = await rawResult.json() as any;

                if (result.error) {
                    throw new Error(JSON.stringify(result.error));
                }

                return result.data;
            });

            return response;
        } catch (e) {
            console.log(e);

            return [];
        }
    }

    return {
        publish,
        update,
        deleteById,
        getAll,
    };
}
