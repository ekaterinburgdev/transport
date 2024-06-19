export type TCardType = "public" | "car" | "pedestrian" | "other";
export type TCardSize = "large" | "small";

export type background = {
    data: {
        attributes: {
            name: string;
            alternativeText: string;
            caption: string;
            width: number;
            height: number;
            formats: { thumbnail: Thumbnail };
            hash: string;
            ext: string;
            mime: string;
            size: number;
            url: string;
            previewUrl: null;
            provider: string;
            provider_metadata: null;
            createdAt: Date;
            updatedAt: Date;
        }
    }
};

export interface Card {
    id: number;
    attributes: {
        title: string;
        titleBackgroundColor: string;
        url: null | string;
        backgroundImage: background;
        backgroundImageHover: background;
        type: TCardType;
        size: TCardSize;
        priority: number;
        cardId: null;
        headerCaption: null | string;
        footerCaption: null | string;
        dynamicId: string;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
    };
}

export interface AccessibilityTransportCounters {
    buses: number,
    trolls: number,
    trams: number
}

interface Thumbnail {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null;
    size: number;
    width: number;
    height: number;
}

export interface Notification {
    id: number;
    attributes: {
        title: string;
        text: string;
        image: string;
        routeNumber: string;
        fromDate: Date;
        untilDate: null;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
    };
}

export interface Marquee {
    id: number;
    attributes: {
        message: string;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
    };
}

