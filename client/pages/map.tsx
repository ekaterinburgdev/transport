import React from 'react';
import Head from 'next/head';

import { Map as MapComponent } from 'components/Map';
import { STRAPI_URL, TILE_SERVER_URL } from 'transport-common/strapi/constants';
import { Modal } from 'components/UI/Modal/Modal';
import { Article } from 'components/Article/Article';

const warningMessage = `### Почему карта транспорта не работает
С осени 2022 года мы занимались развитием сайта: собирали информацию, разрабатывали интерфейс, настраивали отображение транспорта и готовили наш сайт к полноценному релизу.

Мы использовали открытые данные о транспорте и остановках с сайта <a href="http://xn--80axnakf7a.xn--80acgfbsl1azdqr.xn--p1ai/" target="_blank">маршрут.екатеринбург.рф</a>.

С 1 декабря разработчики системы заблокировали возможность использовать их данные. И мы не знаем, получится ли у нас найти способы получения данных о передвижении транспорта вновь.

Если вы разработчик, то можете помочь нам <a href="https://github.com/ekaterinburgdev/transport" target="_blank">на GitHub</a>.`;

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

            <Modal>
                <Article description={warningMessage} external />
            </Modal>
        </>
    );
}
