import React from 'react';
import Head from 'next/head';
import { MainPageApi } from 'api/main-page/main-page';
import { MainPage } from 'components/MainPage';
import { MainPageTypes } from '../components/MainPage/index.types';

export default function Home(props: MainPageTypes) {
    return (
        <>
            <Head>
                <title>Транспортная экосистема Екатеринбурга</title>
                <link rel="icon" href="/favicon.ico" />
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
