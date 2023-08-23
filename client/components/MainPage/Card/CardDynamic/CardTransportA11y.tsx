import classNames from 'classnames/bind';
import cardStyles from '../Card.module.css'
import styles from './CardTransportA11y.module.css';

const cn = classNames.bind(styles);

export function CardTransportA11y({ buses, trolls, trams }) {
    return (
        <div className={cn(styles.CardTransportA11y)}>
            <dl className={cn(styles.CardTransportA11yList)}>
                <div className={cn(styles.CardTransportA11yItem)}>
                    <div className={cn(cardStyles.CardTransportA11y_BusIcon)} />
                    <dt>Автобусы</dt>
                    <dd>{buses}</dd>
                </div>

                <div className={cn(styles.CardTransportA11yItem)}>
                    <div className={cn(cardStyles.CardTransportA11y_TrollIcon)} />
                    <dt>Троллейбусы</dt>
                    <dd>{trolls}</dd>
                </div>

                <div className={cn(styles.CardTransportA11yItem)}>
                    <div className={cn(cardStyles.CardTransportA11y_TramIcon)} />
                    <dt>Трамваи</dt>
                    <dd>{trams}</dd>
                </div>
            </dl>
        </div>
    )
}
