import React from 'react';
import Head from 'next/head';

import { Map as MapComponent } from 'components/Map';
import { STRAPI_URL, TILE_SERVER_URL } from 'transport-common/strapi/constants';

export default function Map() {
    return (
        <>
            <Head>
                <title>Карта транспорта Екатеринбурга</title>
                <link rel="preconnect" href={TILE_SERVER_URL} />
                <link rel="preconnect" href={STRAPI_URL} />
                <script src="https://tally.so/widgets/embed.js" async></script>
            </Head>

            <MapComponent />
        </>
    );
}
