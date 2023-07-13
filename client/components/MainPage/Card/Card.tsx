import classNames from 'classnames/bind';
import { CardProps } from './Card.types';

import styles from './Card.module.css';
import t from 'utils/typograph';

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
    button,
    buttonColor,
    buttonBackground,
    subtitle,
    subtitleColor,
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
                "--CardSubtitleColor": subtitleColor
            } as React.CSSProperties}
        >
            {title && <div className={cn(styles.CardTitle, { [styles.CardTitle_Bg]: Boolean(titleBackground) })}>
                {t(title)}
            </div>}

            {
                dynamicContent
                    ? dynamicContent
                    : <>
                        {subtitle && <div className={cn(styles.CardSubtitle)}>
                            {subtitle}
                        </div>}
                    </>
            }
        </a>
    );
}
