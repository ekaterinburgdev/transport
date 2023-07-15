import classNames from 'classnames/bind';
import { CardProps } from './Card.types';

import styles from './Card.module.css';
import t from 'utils/typograph';
import React from "react";

const cn = classNames.bind(styles);

const hexToRgb = (hex) => {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `${r}, ${g}, ${b}`;
};

export function Card({
    title,
    titleColor,
    titleBackground,
    url,
    backgroundColor,
    backgroundImage,
    headerCaption,
    bottomCaption,
    dynamicContent
}: CardProps) {
    return (
        <a
            className={cn(styles.Card)}
            href={url}
            style={{
                "--CardTitleColor": titleColor,
                "--CardTitleBgrColor": titleBackground,
                "--CardTitleUnderlineColor": hexToRgb(titleColor),
                "--CardBgrColor": backgroundColor,
                "--CardBgrImage": backgroundImage && `url(https://transport-cms.ekaterinburg.io${backgroundImage})`,
                "--CardSubtitleColor": titleColor
            } as React.CSSProperties}
        >
           <div style={{height: "auto"}}>
               {title && <div className={cn(styles.CardTitle, { [styles.CardTitle_Bg]: Boolean(titleBackground) })}>
                   {t(title)}
               </div>}
               {headerCaption && <div className={cn(styles.CardSubtitle)}>
                   {headerCaption}
               </div>}
           </div>

            {
                dynamicContent
                    ? dynamicContent
                    : <div>
                        {bottomCaption &&
                            <div className={headerCaption ?
                                cn(styles.CardBottomCapture)
                                : cn(styles.CardBottomCapture_NoSubtitle)}>
                            {bottomCaption}
                        </div>}
                    </div>
            }
        </a>
    );
}
