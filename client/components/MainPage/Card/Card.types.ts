import React, { ReactElement } from 'react';

import { TCardSize, TCardType } from 'api/main-page/main-page.types';

export type CardProps = {
    type?: TCardType | undefined;
    title: string;
    titleBackgroundColor?: string;
    url: string;
    size?: TCardSize | undefined,
    backgroundImage?: string;
    backgroundImageHover?: string;
    headerCaption?: string;
    footerCaption?: string;
    dynamicContent?: ReactElement;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};
