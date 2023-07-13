import { ReactElement } from "react";

export type CardProps = {
    title: string;
    titleColor: string;
    titleBackground: string;
    url: string;
    backgroundColor: string;
    backgroundImage: string;
    button: string;
    buttonColor: string;
    buttonBackground: string;
    subtitle: string;
    subtitleColor: string;
    invert: boolean;
    dynamicContent: ReactElement;
    key: number;
};
