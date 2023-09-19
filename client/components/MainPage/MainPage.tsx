/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import classNames from 'classnames/bind';
import { MainPageTypes } from './MainPage.types';
import { Card } from './Card/Card';
import { CardTrafficJams } from './Card/CardDynamic/CardTrafficJams';
import { CardTransportA11y } from './Card/CardDynamic/CardTransportA11y';
import { CardMap } from './Card/CardDynamic/CardMap';

import Logo from './Logo.svg';

import styles from './MainPage.module.css';
import { Marquee } from './Marquee/Marquee';

const cn = classNames.bind(styles);

export function MainPage({ cards, cardsDynamicData, marqueeItems }: MainPageTypes) {
    const getDynamicContent = (dynamicId) => {
        switch (dynamicId) {
            case 'a11y-transport':
                return <CardTransportA11y {...cardsDynamicData.a11yTransportCounters} />
            case 'traffic-jams':
                return <CardTrafficJams score={cardsDynamicData.trafficJams} />
            case 'map':
                return <CardMap  />
        }
    }

    return (
        <div className={cn(styles.MainPage)}>
            <div className={cn(styles.MainPageInner)}>
                <div className={cn(styles.MainPageLogo)}>
                    <Logo />
                    <h1 className={cn(styles.MainPageTitle)}>Транспорт<br/>Екатеринбурга</h1>
                </div>

                <div className={styles.MainPageCardGrid}>
                    {cards
                        .sort((a, b) => a.attributes.priority - b.attributes.priority)
                        .map(({ id, attributes }) => {
                            return <Card
                                type={attributes.type}
                                title={attributes.title}
                                titleBackgroundColor={attributes.titleBackgroundColor}
                                url={attributes.url}
                                backgroundImage={attributes?.backgroundImage?.data?.attributes?.url}
                                backgroundImageHover={attributes?.backgroundImageHover?.data?.attributes?.url}
                                headerCaption={attributes.headerCaption}
                                footerCaption={attributes.footerCaption}
                                dynamicContent={getDynamicContent(attributes.dynamicId)}
                                key={id}
                            />
                        })}
                </div>

                <Marquee items={marqueeItems.map(({ attributes: { message } }) => message)} />
            </div>
        </div>
    );
}