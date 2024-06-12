import { ReactElement } from "react";

export type ArticleProps = {
    title?: string;
    description: string;
    aside: ReactElement;
    external?: boolean
};
