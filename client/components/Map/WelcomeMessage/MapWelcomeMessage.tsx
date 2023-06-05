import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';

import { IconFontCharsNames } from 'common/constants/iconFontChars';

import { Divider } from 'components/UI/Divider/Divider';
import { IconFont } from 'components/UI/Typography/IconFont/IconFont';
import { Typography } from 'components/UI/Typography/Typography';
import { PageText } from 'components/UI/Typography/PageText/PageText';

import styles from './MapWelcomeMessage.module.css';

const cn = classNames.bind(styles);

export function MapWelcomeMessage() {
    return (
        <div className={cn(styles.MapWelcomeMessage)}>
            <div className={cn(styles.MapWelcomeMessageRow)}>
                <Typography variant="h3">
                    Привет!
                    <br />
                    Это карта транспорта Екатеринбурга
                    <IconFont name={IconFontCharsNames.resident} />
                </Typography>
                <div className={cn(styles.MapWelcomeMessageDescription)}>
                    <PageText>
                        В карточках транспорта можно посмотреть что за автобус, троллейбус или
                        трамвай едет к вам.
                    </PageText>
                    <PageText>А на остановках — сколько ждать нужный вам маршрут.</PageText>
                    <PageText>
                        Чтобы открыть карточку — кликните на любой транспорт или остановку на карте.
                    </PageText>
                </div>
            </div>
            <Divider />
            <div className={cn(styles.MapWelcomeMessageRow)}>
                <Typography variant="h3">Условные обозначения</Typography>
                <div className={cn(styles.MapWelcomeMessageNotations)}>
                    <div className={cn(styles.MapWelcomeMessageNotation)}>
                        <PageText>Остановка троллейбуса</PageText>
                        <Image
                            src="/icons/troll-stop.svg"
                            width="32"
                            height="32"
                            className={cn(styles.MapWelcomeMessageNotationIcon)}
                            alt="Остановка троллейбуса"
                        />
                    </div>
                    <div className={cn(styles.MapWelcomeMessageNotation)}>
                        <PageText>Остановка автобуса</PageText>
                        <Image
                            src="/icons/bus-stop.svg"
                            width="32"
                            height="32"
                            className={cn(styles.MapWelcomeMessageNotationIcon)}
                            alt="Остановка автобуса"
                        />
                    </div>
                    <div className={cn(styles.MapWelcomeMessageNotation)}>
                        <PageText>Остановка трамвая</PageText>
                        <Image
                            src="/icons/tram-stop.svg"
                            width="32"
                            height="32"
                            className={cn(styles.MapWelcomeMessageNotationIcon)}
                            alt="Остановка трамвая"
                        />
                    </div>
                    <div className={cn(styles.MapWelcomeMessageNotation)}>
                        <PageText>Остановка автобуса и троллейбуса</PageText>
                        <Image
                            src="/icons/bus-troll-stop.svg"
                            width="32"
                            height="32"
                            className={cn(styles.MapWelcomeMessageNotationIcon)}
                            alt="Остановка автобуса и троллейбуса"
                        />
                    </div>
                    <div className={cn(styles.MapWelcomeMessageNotation)}>
                        <PageText>Низкопольный транспорт</PageText>
                        <div
                            className={cn(
                                styles.MapWelcomeMessageNotationIcon,
                                styles.MapWelcomeMessageFeatures,
                            )}
                        >
                            <Image
                                src="/icons/tram-accessibility.svg"
                                width="20"
                                height="20"
                                alt="Низкопольный транспорт"
                            />
                        </div>
                    </div>
                    <div className={cn(styles.MapWelcomeMessageNotation)}>
                        <PageText>Едет не по маршруту</PageText>
                        <div
                            className={cn(
                                styles.MapWelcomeMessageNotation,
                                styles.MapWelcomeMessageFeatures,
                            )}
                        >
                            <Image
                                src="/icons/warning.svg"
                                width="20"
                                height="20"
                                alt="Едет не по маршруту"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
