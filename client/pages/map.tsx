import React from 'react';
import Head from 'next/head';

import { Map as MapComponent } from 'components/Map';
import { STRAPI_URL, TILE_SERVER_URL } from 'transport-common/strapi/constants';
import { Modal } from 'components/UI/Modal/Modal';
import { Article } from 'components/Articles/Article/Article';

const warningMessage = `С осени 2022 года мы занимались развитием сайта: собирали информацию, разрабатывали интерфейс, настраивали отображение транспорта и готовили наш сайт к полноценному релизу.

Мы использовали данные о движении транспорта и остановках с официального сайта <a href="http://xn--80axnakf7a.xn--80acgfbsl1azdqr.xn--p1ai/" target="_blank">маршрут.екатеринбург.рф</a>.

С 1 декабря разработчики системы заблокировали возможность использовать их данные. И мы не знаем, получится ли у нас найти способы получения данных о передвижении транспорта вновь.

О том, как можно нам помочь, мы рассказали <a href="https://github.com/ekaterinburgdev/transport/issues/100" target="_blank">на GitHub</a>.`;

export default function Map() {
    return (
        <>
            <Head>
                <title>Карта транспорта Екатеринбурга</title>
                <link rel="preconnect" href={TILE_SERVER_URL} />
                <link rel="preconnect" href={STRAPI_URL} />
            </Head>

            <MapComponent />

            <Modal title="Почему карта транспорта не работает" maxWidth={800} align="center">
                <Article
                    description={warningMessage}
                    external
                />
            </Modal>
        </>
    );
}
