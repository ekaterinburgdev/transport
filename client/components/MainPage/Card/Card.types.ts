import { ReactElement } from "react";

export type CardProps = {
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
