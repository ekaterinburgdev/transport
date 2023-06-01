/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import classNames from 'classnames/bind';
import { MainPageTypes } from './MainPage.types';
import { Card } from './Card/Card';

import Logo from './Logo.svg';

import styles from './MainPage.module.css';
import { Marquee } from './Marquee/Marquee';

const cn = classNames.bind(styles);

export function MainPage({ cards, marqueeItems, notifications }: MainPageTypes) {
    return (
        <div className={cn(styles.MainPage)}>
            <div className={cn(styles.MainPageInner)}>
                <div className={cn(styles.MainPageLogo)}>
                    <Logo />
                    <h1 className={cn(styles.MainPageTitle)}>Транспорт Екатеринбурга</h1>
                </div>
                {/* {notifications.map(({ id, attributes }) => (
                    <Notification
                        text={attributes.text}
                        title={attributes.title}
                        image={attributes.image}
                        key={id}
                    />
                ))} */}

                <div className={styles.MainPageCardGrid}>
                    {cards
                        .sort((a, b) => a.attributes.priority - b.attributes.priority)
                        .map(({ id, attributes }) => (
                            <Card
                                title={attributes.title}
                                titleColor={attributes.titleColor}
                                titleBackground={attributes.titleBackground}
                                url={attributes.url}
                                backgroundColor={attributes.backgroundColor}
                                backgroundImage={attributes?.backgroundImage?.data?.attributes?.url}
                                button={attributes.button}
                                buttonColor={attributes.buttonColor}
                                buttonBackground={attributes.buttonBackground}
                                subtitle={attributes.subtitle}
                                subtitleColor={attributes.subtitleColor}
                                invert={attributes.invert}
                                key={id}
                            />
                        ))}
                </div>

                <Marquee items={marqueeItems.map(({ attributes: { message } }) => message)} />
            </div>
        </div>
    );
}
