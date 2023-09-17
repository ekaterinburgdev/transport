import { ReactElement } from "react";
import {TCardType} from "api/main-page/main-page.types";

export type CardProps = {
    type: TCardType | undefined;
    title: string;
    url: string;
    backgroundImage: string;
    headerCaption: string;
    footerCaption: string;
    dynamicContent: ReactElement;
    key: number;
};
