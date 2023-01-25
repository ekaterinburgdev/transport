import React from 'react';
import Head from 'next/head';
import { MainPageApi } from 'api/main-page/main-page';
import { MainPage } from 'components/MainPage';

export default function Home(props) {
    return (
        <>
            <Head>
                <title>Транспорт Екатеринбурга</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=1200, initial-scale=1" />
                <style dangerouslySetInnerHTML={{ __html: 'body { background: #f2f2f2; }' }} />
            </Head>

            <MainPage {...props} />
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {
            cards: await MainPageApi.getCards(),
            marqueeItems: await MainPageApi.getMarqueeItems(),
            notifications: await MainPageApi.getNotifications(),
        },
        revalidate: 15,
    };
}
