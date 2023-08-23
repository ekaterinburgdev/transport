import { ReactElement } from "react";
import {TCardType} from "api/main-page/main-page.types";

export type CardProps = {
    type: TCardType | undefined;
    title: string;
    titleColor: string;
    titleBackground: string;
    url: string;
    backgroundColor: string;
    backgroundImage: string;
    headerCaption: string;
    bottomCaption: string;
    invert: boolean;
    dynamicContent: ReactElement;
    key: number;
};
