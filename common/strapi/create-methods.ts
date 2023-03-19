import fetch from 'node-fetch';

import { StrapiContentTypes } from '../types/strapi';
import { strapiUrl } from './constants';

export function createStrapiMethods(contentType: StrapiContentTypes, jwt?: string) {
    const requestToStrapiOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
        },
    };

    async function publish<T>(data: T) {
        try {
            const resp = await fetch(`${strapiUrl}/api/${contentType}s`, {
                ...requestToStrapiOptions,
                method: 'POST',
                body: JSON.stringify({
                    data,
                }),
            });

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
            const resp = await fetch(`${strapiUrl}/api/${contentType}s/${id}`, {
                method: 'PUT',
                ...requestToStrapiOptions,
                body: JSON.stringify({
                    data: attributes,
                }),
            });

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
            const resp = await fetch(`${strapiUrl}/api/${contentType}s/${id}`, {
                method: 'DELETE',
                ...requestToStrapiOptions,
            });

            const body = (await resp.json()) as any;

            if (body.error) {
                throw new Error(JSON.stringify(body.error));
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function getAll() {
        try {
            const resp = await fetch(
                `${strapiUrl}/api/${contentType}s?pagination[pageSize]=2000`,
                requestToStrapiOptions,
            );

            const body = (await resp.json()) as any;

            if (body.error) {
                throw new Error(JSON.stringify(body.error));
            }

            return body.data;
        } catch (e) {
            console.log(e);
        }
    }

    return {
        publish,
        update,
        deleteById,
        getAll,
    };
}
