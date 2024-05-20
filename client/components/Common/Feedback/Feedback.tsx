import React from 'react';
import classNames from 'classnames/bind';

import type { FeedbackProps } from './Feedback.types';

import styles from './Feedback.module.css';

const cn = classNames.bind(styles);

export function Feedback({
    caption = 'Фидбек',
    size
} : FeedbackProps) {
    return (
        <a
            href="https://tally.so#tally-open=mRDkVd&tally-width=650&tally-overlay=1&tally-emoji-animation=none"
            target="_blank"
            rel="noreferrer"
            className={cn(styles.MapFeedback, {
                [styles[`MapFeedback_Size-${size}`]]: size
            })}
        >
            {caption}
        </a>
    );
}
