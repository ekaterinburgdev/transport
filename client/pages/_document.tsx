import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import { SITE_URL } from 'transport-common/strapi/constants';

export default function Document() {
    const siteTitle = 'Транспорт Екатеринбурга';
    const siteDescription = 'Всё про транспорт Екатеринбурга. Цена проезда, карта транспорта, расписание маршрутов, статус пробок и правила парковок.';
    const ogImage = `${SITE_URL}/og-preview.jpg`;

    return (
        <Html lang="ru">
            <Head>
                <meta name="theme-color" content="#000000" />
                <meta name="description" content={siteDescription} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={SITE_URL} />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={siteDescription} />
                <meta property="og:image" content={ogImage} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={SITE_URL} />
                <meta property="twitter:title" content={siteTitle} />
                <meta property="twitter:description" content={siteDescription} />
                <meta property="twitter:image" content={ogImage} />

                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
