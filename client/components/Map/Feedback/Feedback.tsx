import React from 'react';
import classNames from 'classnames/bind';

import styles from './Feedback.module.css';

const cn = classNames.bind(styles);

export function Feedback() {
    return (
        <a
            href="https://tally.so#tally-open=wLzxEG&tally-width=650&tally-overlay=1&tally-emoji-animation=none"
            target="_blank"
            rel="noreferrer"
            className={cn(styles.MapFeedback)}
        >
            Фидбек
        </a>
    );
}
