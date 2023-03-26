import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';

import sidebarStyles from 'styles/leaflet-sidebar.module.css';

import { IconFontCharsNames } from 'common/constants/iconFontChars';
import { POSITION_CLASSES } from 'common/constants/positions';

import { Divider } from 'components/UI/Divider/Divider';
import { IconFont } from 'components/UI/Typography/IconFont/IconFont';
import { Typography } from 'components/UI/Typography/Typography';
import { PageText } from 'components/UI/Typography/PageText/PageText';

import { useDisablePropagation } from 'hooks/useDisablePropagation';

import styles from './MapWelcomeMessage.module.css';

const cn = classNames.bind(styles);

export function MapWelcomeMessage() {
    const ref = useRef<HTMLDivElement>(null);

    useDisablePropagation(ref);

    return (
        <div
            ref={ref}
            className={cn(
                POSITION_CLASSES.topleft,
                styles.MapWelcomeMessage,
                sidebarStyles.leafletSidebar,
            )}
        >
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
                            src="/icons/troll-station.svg"
                            width="32"
                            height="32"
                            className={cn(styles.MapWelcomeMessageNotationIcon)}
                            alt="Остановка троллейбуса"
                        />
                    </div>
                    <div className={cn(styles.MapWelcomeMessageNotation)}>
                        <PageText>Остановка автобуса</PageText>
                        <Image
                            src="/icons/bus-station.svg"
                            width="32"
                            height="32"
                            className={cn(styles.MapWelcomeMessageNotationIcon)}
                            alt="Остановка автобуса"
                        />
                    </div>
                    <div className={cn(styles.MapWelcomeMessageNotation)}>
                        <PageText>Остановка трамвая</PageText>
                        <Image
                            src="/icons/tram-station.svg"
                            width="32"
                            height="32"
                            className={cn(styles.MapWelcomeMessageNotationIcon)}
                            alt="Остановка трамвая"
                        />
                    </div>
                    <div className={cn(styles.MapWelcomeMessageNotation)}>
                        <PageText>Остановка автобуса и троллейбуса</PageText>
                        <Image
                            src="/icons/troll-bus-station.svg"
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
                                src="/icons/tram-disability.svg"
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
