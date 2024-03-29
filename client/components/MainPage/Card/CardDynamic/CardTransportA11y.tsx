import classNames from 'classnames/bind';
import styles from './CardTransportA11y.module.css';

const cn = classNames.bind(styles);

export function CardTransportA11y({ buses, trolls, trams }) {
    return (
        <div className={cn(styles.CardTransportA11y)}>
            <dl className={cn(styles.CardTransportA11yList)}>
                <div className={cn(styles.CardTransportA11yItem)}>
                    <div className={cn(styles.CardTransportA11y__Icon, styles.CardTransportA11y__Icon_Bus)} />
                    <dt>Автобусы</dt>
                    <dd>{buses}</dd>
                </div>

                <div className={cn(styles.CardTransportA11yItem)}>
                    <div className={cn(styles.CardTransportA11y__Icon, styles.CardTransportA11y__Icon_Troll)} />
                    <dt>Троллейбусы</dt>
                    <dd>{trolls}</dd>
                </div>

                <div className={cn(styles.CardTransportA11yItem)}>
                    <div className={cn(styles.CardTransportA11y__Icon, styles.CardTransportA11y__Icon_Tram)} />
                    <dt>Трамваи</dt>
                    <dd>{trams}</dd>
                </div>
            </dl>
        </div>
    )
}
