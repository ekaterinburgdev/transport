import React from 'react';
import Head from 'next/head';

import { Map as MapComponent } from 'components/Map';

export default function Map() {
    return (
        <>
            <Head>
                <title>Карта транспорта</title>
                <style>{`
                    html,
                    body {
                        overflow: hidden;
                    }
                `}</style>
            </Head>

            <MapComponent />
        </>
    );
}
