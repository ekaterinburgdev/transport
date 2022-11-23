import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <Head>
                <title>Ekaterinburg transport</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header className="header">
                <ul className="menu">
                    <li className="menu__item menu__item_active">Пассажирам</li>
                    <li className="menu__item">
                        <Link href="/guests">Гостям города</Link>
                    </li>
                </ul>
            </header>
            <main>
                <h1>Пассажирам</h1>

                <div className="main-list">
                    <iframe title="123" className="map" src="/map" />

                    <article className="news">
                        <section className="news__item">
                            <time>16 ноября</time>
                            <a href="/test">
                                Пригородный вокзал Переделкино будущего D4 готов на 75%. Что будет
                                на месте старой станции?
                            </a>
                        </section>
                        <section className="news__item">
                            <time>15 ноября</time>
                            <a href="/test">
                                Сегодня мы закрыли сезон аренды электросамокатов и велопроката
                            </a>
                        </section>
                        <section className="news__item">
                            <time>14 ноября</time>
                            <a href="/test">
                                С 12 ноября мы закрыли участок между станциями «Автозаводская» и
                                «Орехово» Замоскворецкой линии для
                            </a>
                        </section>
                    </article>
                </div>

                <div className="card-list">
                    <div className="card">
                        <a href="/test" className="card__link">
                            Сколько стоит
                            <br />
                            проезд?
                            <br />
                            <br />
                            32 рубля
                        </a>
                    </div>
                    <div className="card">
                        <a href="/test" className="card__link">
                            Тарифы проездного
                        </a>
                    </div>
                    <div
                        className="card"
                        style={{
                            backgroundImage:
                                "url('https://www.oblgazeta.ru/media/filer_public/2021/07/02/3063d435-0225-4098-9ecb-d0f6d3d3a6cc-appoblgazetamediaDNKYDipg3Yo869PPGrMRusxu4lu8LGHR.jpeg.1024x0_q85.jpg')",
                        }}
                    >
                        <a href="/test" className="card__link">
                            Как оплатить
                            <br />
                            проезд?
                            <br />
                            <small style={{ fontSize: 20, lineHeight: 1.1 }}>
                                <ul>
                                    <li>Наличка</li>
                                    <li>Безналичный расчет</li>
                                    <li>Уралочка</li>
                                    <li>ЕКАРТА</li>
                                </ul>
                            </small>
                        </a>
                    </div>
                    <div className="card">
                        <a href="/test" className="card__link">
                            Где оформить проездной?
                            <br />
                            (карта с точками)
                        </a>
                    </div>
                    <div className="card">
                        <a href="/test" className="card__link">
                            Бюро находок
                            <br />
                            224-00-18
                        </a>
                    </div>
                    <div className="card">
                        <a href="/test" className="card__link">
                            Пешеходная карта
                        </a>
                    </div>
                    <div className="card">
                        <a href="/test" className="card__link">
                            Как провозить
                            <br />
                            велосипеды?
                        </a>
                    </div>
                    <div className="card">
                        <a href="/test" className="card__link">
                            Пригородный транспорт
                        </a>
                    </div>
                    <div className="card">
                        <a href="/test" className="card__link">
                            Такси
                        </a>
                    </div>
                    <div className="card">
                        <a href="/test" className="card__link">
                            Самокаты
                        </a>
                    </div>
                    <div className="card">
                        <a href="/test" className="card__link">
                            Велотранспорт
                        </a>
                    </div>
                    {/*
                    <div className="card">
                        <a href="/test" className="card__link">Парковки</a>
                    </div>
                    */}
                    <div className="card">
                        <a href="/test" className="card__link">
                            ЕКАРТА
                        </a>
                    </div>
                    <div className="card">
                        <a href="/test" className="card__link">
                            Штрафы
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}
