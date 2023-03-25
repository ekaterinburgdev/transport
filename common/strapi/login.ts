import fetch from 'node-fetch';

import { StrapiLoginResponse } from '../types/strapi';
import { STRAPI_URL, EMAIL, PASSWORD } from './constants';

export async function loginStrapi() {
    const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identifier: EMAIL,
            password: PASSWORD,
        }),
    });

    const body = (await response.json()) as StrapiLoginResponse;

    const { jwt } = body;

    return jwt;
}
