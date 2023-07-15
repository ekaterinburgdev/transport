import classNames from 'classnames/bind';

import styles from './CardTrafficJams.module.css';

const cn = classNames.bind(styles);
const getTrafficLightByScore = (score: any) => {
    const scoreNumber = parseInt(score?.toString());
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
        <div className={styles.CardTrafficLight_Container}>
            <div className={cn(styles.CardTrafficLight_Border)}>
            </div>
            <div className={cn(styles.CardTrafficLight, getTrafficLightByScore(score))}>
                {score}
            </div>
        </div>
    )
}
