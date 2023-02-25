import React from 'react';
import classNames from 'classnames/bind';

import styles from './PageText.module.css';

export type PageTextProps = {
    children: React.ReactNode;
    size?: 'large' | 'medium' | 'small';
    bold?: boolean;
    className?: string;
};

const cn = classNames.bind(styles);

export function PageText({ size = 'medium', bold, children, className }: PageTextProps) {
    return (
        <p className={cn(styles.pageText, styles[size], { [styles.bold]: bold }, className)}>
            {children}
        </p>
    );
}

PageText.defaultProps = {
    size: 'medium',
    bold: false,
    className: '',
};
