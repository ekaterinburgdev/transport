import React from 'react';
import classNames from 'classnames/bind';

import { CardProps } from './Card.types';

import styles from './Card.module.css';

const cn = classNames.bind(styles);

export function Card({
    title,
    titleColor,
    titleBackground,
    url,
    backgroundColor,
    backgroundImage,
    button,
    buttonColor,
    buttonBackground,
    subtitle,
    subtitleColor,
}: CardProps) {
    return (
        <a
            className={cn(styles.Card)}
            href={url}
            style={{
                backgroundColor: backgroundColor || '#fff',
                backgroundImage: `url(https://transport-cms.ekaterinburg.io${backgroundImage})`,
            }}
        >
            <div
                className={cn(styles.CardTitle)}
                style={{ backgroundColor: titleBackground, color: titleColor }}
            >
                {title}
            </div>

            <div className={cn(styles.CardSubtitle)} style={{ color: subtitleColor }}>
                {subtitle}
            </div>

            <div
                className={cn(styles.CardButton)}
                style={{ backgroundColor: buttonBackground, color: buttonColor }}
            >
                {button}
            </div>
        </a>
    );
}
