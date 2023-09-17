import classNames from 'classnames/bind';
import { CardProps } from './Card.types';
import styles from './Card.module.css';
import t from 'utils/typograph';
import React, { ReactElement } from "react";

const cn = classNames.bind(styles);

export function Card({
    title,
    type,
    url,
    backgroundImage,
    dynamicContent,
    headerCaption,
    footerCaption
}: CardProps) {
    const getStylesByType = (type: CardProps["type"]) => {
        switch (type) {
            case "public":
                return cn(styles.Card, styles.Card_Public)
            case "car":
                return cn(styles.Card, styles.Card_Car)
            case "other":
                return cn(styles.Card, styles.Card_Other)
            case "pedestrian":
                return cn(styles.Card, styles.Card_Pedestrian)
            default:
                return cn(styles.Card)
        }
    }

    return (
        <a
            className={getStylesByType(type)}
            href={url}
            style={{
                "--CardBgImage": backgroundImage && `url(https://transport-cms.ekaterinburg.city${backgroundImage})`,
            } as React.CSSProperties}
        >
            {title && <div className={cn(styles.CardTitle)}>
                {t(title)}
            </div>}
            {headerCaption && <p className={cn(styles.CardHeaderCaption)}>
                {t(headerCaption)}
            </p>}
            {footerCaption && <p className={cn(styles.CardFooterCaption)}>
                {t(footerCaption)}
            </p>}
            {dynamicContent && <div className={cn(styles.CardDynamic)}>
                {dynamicContent}
            </div>}
        </a>
    );
}
