import React from 'react';
import classNames from 'classnames/bind';

import Image from 'next/image';
import { NotificationProps } from './Notification.types';

import styles from './Notification.module.css';

const cn = classNames.bind(styles);

export function Notification({ title, text, image }: NotificationProps) {
    return (
        <div className={cn(styles.Notification)}>
            <div className={cn(styles.NotificationTitle)}>{title}</div>

            <div className={cn(styles.NotificationText)}>{text}</div>
            <Image src={image} alt="" />
        </div>
    );
}
