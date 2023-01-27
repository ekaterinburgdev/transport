import React from 'react';
import classNames from 'classnames/bind';

import styles from './Divider.module.css';

const cn = classNames.bind(styles);

export function Divider() {
    return <hr className={cn(styles.Divider)} />;
}
