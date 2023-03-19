import fetch from 'node-fetch';

import { StrapiLoginResponse } from '../types/strapi';
import { strapiUrl, email, password } from './constants';

export async function loginStrapi() {
    const response = await fetch(`${strapiUrl}/api/auth/local`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identifier: email,
            password,
        }),
    });

    const body = (await response.json()) as StrapiLoginResponse;

    const { jwt } = body;

    return jwt;
}
