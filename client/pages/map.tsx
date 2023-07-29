import React from 'react';
import Head from 'next/head';

import { Map as MapComponent } from 'components/Map';

export default function Map() {
    return (
        <>
            <Head>
                <title>Карта транспорта Екатеринбурга</title>
                <link rel="preconnect" href="https://tiles.ekaterinburg.io" />
                <link rel="preconnect" href="https://map-api.ekaterinburg.io" />
            </Head>

            <MapComponent />
        </>
    );
}
