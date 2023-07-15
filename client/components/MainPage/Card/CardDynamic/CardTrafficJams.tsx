import classNames from 'classnames/bind';

import styles from './CardTrafficJams.module.css';

const cn = classNames.bind(styles);

export function CardTrafficJams({ score }) {
    return (
        <div className={styles.CardTrafficLight_Container}>
            <div className={cn(styles.CardTrafficLight_Border)}>
            </div>
            <div className={cn(styles.CardTrafficJams)}>
                <div className={cn(styles.CardTrafficLight)}>
                    {score}
                </div>
            </div>
        </div>
    )
}
