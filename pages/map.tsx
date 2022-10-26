import React from 'react';
import Head from 'next/head';

import { Map as MapComponent } from 'components/Map';

export default function Map() {
    return (
        <>
            <Head>
                <title>Ekaterinburg transport — Map</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <MapComponent />
        </>
    );
}
