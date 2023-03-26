import React from 'react';
import Head from 'next/head';
import { MainPageApi } from 'api/main-page/main-page';
import { MainPage } from 'components/MainPage/MainPage';

export default function Home(props) {
    return (
        <>
            <Head>
                <title>Транспорт Екатеринбурга</title>
            </Head>

            <MainPage {...props} />
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {
            cards: (await MainPageApi.getCards()) || [],
            marqueeItems: (await MainPageApi.getMarqueeItems()) || [],
            notifications: (await MainPageApi.getNotifications()) || [],
        },
        revalidate: 15,
    };
}
