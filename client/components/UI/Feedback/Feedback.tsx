import React from 'react';
import classNames from 'classnames/bind';

import type { FeedbackProps } from './Feedback.types';

import styles from './Feedback.module.css';

const cn = classNames.bind(styles);

export function Feedback({ size, onClick } : FeedbackProps) {
    return (
        <a
            href="mailto:mail@ekaterinburg.dev"
            target="_blank"
            rel="noreferrer"
            className={cn(styles.Feedback, { [styles[`Feedback_Size-${size}`]]: size })}
            onClick={onClick}
        >
            Фидбек
        </a>
    );
}
