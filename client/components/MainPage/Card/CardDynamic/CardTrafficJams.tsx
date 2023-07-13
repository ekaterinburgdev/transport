import classNames from 'classnames/bind';

import styles from './CardTrafficJams.module.css';

const cn = classNames.bind(styles);

export function CardTrafficJams({ score }) {
    return (
        <>
            <div className={cn(styles.CardTrafficJams)}>
                {score}
            </div>
        </>
    )
}
