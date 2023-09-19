import classNames from 'classnames/bind';
import { CardProps } from './Card.types';
import t from 'utils/typograph';
import React from 'react';

import { STRAPI_URL } from 'transport-common/strapi/constants';

import styles from './Card.module.css';

const CARD_TYPES_CLASSNAMES = {
    public: styles.Card_Public,
    car: styles.Card_Car,
    other: styles.Card_Other,
    pedestrian: styles.Card_Pedestrian,
};

const cn = classNames.bind(styles);

export function Card({
    title,
    titleBackgroundColor,
    type,
    url,
    backgroundImage,
    backgroundImageHover,
    dynamicContent,
    headerCaption,
    footerCaption,
}: CardProps) {
    return (
        <a
            className={cn(styles.Card, CARD_TYPES_CLASSNAMES[type])}
            href={url}
            style={
                {
                    '--CardTitleBgColor': titleBackgroundColor,
                    '--CardBgImage': backgroundImage && `url(${STRAPI_URL}${backgroundImage})`,
                    '--CardBgImageHover':
                        backgroundImageHover && `url(${STRAPI_URL}${backgroundImageHover})`,
                } as React.CSSProperties
            }
        >
            {title && (
                <div
                    className={cn(styles.CardTitle, {
                        [styles.CardTitle_Bg]: titleBackgroundColor,
                    })}
                >
                    {t(title)}
                </div>
            )}
            {headerCaption && <p className={cn(styles.CardHeaderCaption)}>{t(headerCaption)}</p>}
            {footerCaption && <p className={cn(styles.CardFooterCaption)}>{t(footerCaption)}</p>}
            {dynamicContent && <div className={cn(styles.CardDynamic)}>{dynamicContent}</div>}
        </a>
    );
}
