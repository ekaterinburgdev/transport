import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    const siteTitle = 'Транспорт Екатеринбурга';
    const siteUrl = 'https://transport.ekaterinburg.city/';
    const siteDescription = 'Всё про транспорт Екатеринбурга. Цена проезда, карта транспорта, расписание маршрутов, статус пробок и правила парковок.';
    const ogImage = `${siteUrl}og-preview.jpg`;

    return (
        <Html lang="ru">
            <Head>
                <meta name="theme-color" content="#000000" />
                <meta name="description" content={siteDescription} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={siteUrl} />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={siteDescription} />
                <meta property="og:image" content={ogImage} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={siteUrl} />
                <meta property="twitter:title" content={siteTitle} />
                <meta property="twitter:description" content={siteDescription} />
                <meta property="twitter:image" content={ogImage} />

                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            <body>
                {process.env.NODE_ENV === 'production' && (
                    // eslint-disable-next-line react/no-danger
                    <script dangerouslySetInnerHTML={{
                        __html:
                            `if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then((serviceWorker) => {
            console.debug('Service Worker registered: ', serviceWorker);
        })
        .catch((error) => {
            console.error('Error registering the Service Worker: ', error);
        });
}` }}
                    />
                )}
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
