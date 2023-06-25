export interface Card {
    id: number;
    attributes: {
        title: string;
        titleColor: string;
        titleBackground: null;
        url: null | string;
        invert: boolean | null;
        backgroundColor: null | string;
        backgroundImage: {
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
                };
            };
        };
        button: null;
        buttonColor: null;
        buttonBackground: null;
        type: CardType;
        priority: number;
        size: CardSize;
        cardId: null;
        subtitle: null | string;
        subtitleColor: string;
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

enum CardType {
    All = 'all',
    Citizen = 'citizen',
}

enum CardSize {
    L = 'L',
    M = 'M',
    S = 'S',
}
