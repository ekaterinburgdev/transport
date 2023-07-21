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
                    <h1 className={cn(styles.MainPageTitle)}>Транспорт Екатеринбурга</h1>
                </div>

                <div className={styles.MainPageCardGrid}>
                    {cards
                        .sort((a, b) => a.attributes.priority - b.attributes.priority)
                        .map(({ id, attributes }) => {
                            return <Card
                                title={attributes.title}
                                titleColor={attributes.titleColor}
                                titleBackground={attributes.titleBackground}
                                url={attributes.url}
                                backgroundColor={attributes.backgroundColor}
                                backgroundImage={attributes?.backgroundImage?.data?.attributes?.url}
                                headerCaption={attributes.headerCaption}
                                bottomCaption={attributes.bottomCaption}
                                invert={attributes.invert}
                                dynamicContent={getDynamicContent(attributes.dynamicId)}
                                key={id}
                            />
                        })}
                </div>

                <Marquee items={marqueeItems.map(({ attributes: { message } }) => message)} />
            </div>

            <div className={styles.MainPageFooter}></div>
        </div>
    );
}