import { STRAPI_URL } from './constants';

export async function deleteFile(id: number, jwt: string) {
    try {
        await fetch(`${STRAPI_URL}/api/upload/files/${id}`, {
            headers: {
                ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
            },
            method: 'DELETE',
        });
    } catch (e) {
        console.log(e);
    }
}

export async function uploadFile(data: FormData, jwt: string) {
    try {
        const resp = await fetch(`${STRAPI_URL}/api/upload`, {
            headers: {
                ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
            },
            method: 'POST',
            body: data,
        });

        const body = (await resp.json()) as any;

        if (body.error) {
            throw new Error(JSON.stringify(body.error));
        }

        if (resp.status !== 200) {
            throw new Error(resp.statusText);
        }

        return body;
    } catch (e) {
        console.log(e);
    }
}
