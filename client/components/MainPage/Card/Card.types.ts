import React, { ReactElement } from 'react';

import { TCardType } from 'api/main-page/main-page.types';

export type CardProps = {
    type: TCardType | undefined;
    title: string;
    titleBackgroundColor: string;
    url: string;
    backgroundImage: string;
    backgroundImageHover: string;
    headerCaption: string;
    footerCaption: string;
    dynamicContent: ReactElement;
    key: number;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};
