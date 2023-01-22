export interface Card {
    id: number,
    attributes: {
        title: string;
        titleColor: string;
        titleBackground: null;
        url: null | string;
        invert: boolean | null;
        backgroundColor: null | string;
        backgroundImage: null | string;
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
    }
}

export interface Notification {
    id: number,
    attributes: {
        title: string;
        text: string;
        image: string,
        routeNumber: string;
        fromDate: Date;
        untilDate: null;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
    }
}

export interface Marquee {
    id: number,
    attributes: {
        message: string;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
    }
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
