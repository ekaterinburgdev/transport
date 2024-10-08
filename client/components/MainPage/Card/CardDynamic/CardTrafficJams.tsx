import classNames from 'classnames/bind';

import styles from './CardTrafficJams.module.css';
import React from "react";

const cn = classNames.bind(styles);
const getTrafficLightByScore = (score: any) => {
    const scoreNumber = Number(score);
    if (scoreNumber < 4) {
        return styles.CardTrafficLight_Green;
    } else if (scoreNumber < 7) {
        return styles.CardTrafficLight_Yellow;
    } else {
        return styles.CardTrafficLight_Red;
    }
}
export function CardTrafficJams({ score }) {
    return (
        <div className={cn(styles.CardTrafficLight, getTrafficLightByScore(score))}>
            {Number(score)}
        </div>
    )
}
