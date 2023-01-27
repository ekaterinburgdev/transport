import React from 'react';
import classNames from 'classnames/bind';

import { ICON_FONT_CHARS, IconFontCharsNames } from 'common/constants/iconFontChars';
import { VEHICLE_TYPE_COLORS } from 'common/constants/colors';

import styles from './IconFont.module.css';

export type IconFontProps = {
    name: IconFontCharsNames;
    className?: string;
};

const cn = classNames.bind(styles);

export function IconFont({ name, className }: IconFontProps) {
    return (
        <span
            className={cn(styles.IconFont, className)}
            style={{ color: VEHICLE_TYPE_COLORS[name] }}
        >
            {ICON_FONT_CHARS[name]}
        </span>
    );
}

IconFont.defaultProps = {
    className: '',
};
