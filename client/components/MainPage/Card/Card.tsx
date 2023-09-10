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
                "--CardTitleUnderlineColor": titleColor && hexToRgb(titleColor),
                "--CardBgrColor": backgroundColor,
                "--CardBgrImage": backgroundImage && `url(https://transport-cms.ekaterinburg.city${backgroundImage})`,
                "--CardSubtitleColor": titleColor
            } as React.CSSProperties}
        >
           <div>
               {title && <div className={cn(styles.CardTitle, { [styles.CardTitle_Bg]: Boolean(titleBackground) })}>
                   {t(title)}
               </div>}
               {headerCaption && <p className={cn(styles.CardSubtitle)}>
                   {headerCaption}
               </p>}
           </div>

            {
                dynamicContent
                    ? dynamicContent
                    : <div>
                        {bottomCaption &&
                            <p className={headerCaption ?
                                cn(styles.CardBottomCapture)
                                : cn(styles.CardBottomCapture_NoSubtitle)}>
                            {bottomCaption}
                        </p>}
                    </div>
            }
        </a>
    );
}
