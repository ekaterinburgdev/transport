import { useRef } from 'react';
import classNames from 'classnames/bind';
import t from 'utils/typograph';
import { STRAPI_URL } from 'transport-common/strapi/constants';
import { useSmoothCorners } from './useSmoothCorners';

import { CardProps } from './Card.types';

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
    const cardRef = useRef<HTMLAnchorElement>(null);
    const cardTitleRef = useRef<HTMLDivElement>(null);
    useSmoothCorners(cardRef);

    if (titleBackgroundColor) {
        useSmoothCorners(cardTitleRef);
    }

    return (
        <a
            className={cn(styles.Card, CARD_TYPES_CLASSNAMES[type])}
            href={url}
            ref={cardRef}
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
                    ref={cardTitleRef}
                >
                    {t(title)}
                </div>
            )}
            {headerCaption && <p className={cn(styles.CardHeaderCaption)}>{t(headerCaption)}</p>}
            {footerCaption && (
                <p
                    className={
                        headerCaption
                            ? cn(styles.CardFooterCaption)
                            : cn(styles.CardFooterCaption_NoSubtitle)
                    }
                >
                    {t(footerCaption)}
                </p>
            )}
            {dynamicContent && <div className={cn(styles.CardDynamic)}>{dynamicContent}</div>}
        </a>
    );
}
