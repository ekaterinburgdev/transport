import classNames from 'classnames/bind';

import { Map as MapComponent } from 'components/Map';

import styles from './CardMap.module.css';

const cn = classNames.bind(styles);

export function CardMap() {
    return (
        <div className={cn(styles.CardMap)}>
            <div className={cn(styles.CardMap__Widget)}>
                <MapComponent
                    zoom={16}
                    showControls={false}
                />
            </div>
            <div className={cn(styles.CardMap__NonClick)}></div>
        </div>
    )
}
