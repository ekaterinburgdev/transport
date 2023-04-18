import React from 'react';
import classNames from 'classnames/bind';

import styles from './Typography.module.css';

export type TypographyProps = {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'caption';
    children: React.ReactNode;
    className?: string;
};

const cn = classNames.bind(styles);

export function Typography({ variant, children, className }: TypographyProps) {
    switch (variant) {
        case 'h1':
            return <h1 className={cn(styles.h1, className)}>{children}</h1>;
        case 'h2':
            return <h2 className={cn(styles.h2, className)}>{children}</h2>;
        case 'h3':
            return <h3 className={cn(styles.h3, className)}>{children}</h3>;
        case 'h4':
            return <h4 className={cn(styles.h4, className)}>{children}</h4>;
        case 'caption':
            return <p className={cn(styles.caption, className)}>{children}</p>;
        default:
            return null;
    }
}

Typography.defaultProps = {
    className: '',
};
