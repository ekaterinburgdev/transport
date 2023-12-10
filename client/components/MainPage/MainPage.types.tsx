import { Article } from 'api/articles/articles.types';
import type {
    Card,
    AccessibilityTransportCounters,
    Marquee,
    Notification,
} from 'api/main-page/main-page.types';

export type MainPageTypes = {
    cards: Card[];
    cardsDynamicData: {
        trafficJams: number;
        a11yTransportCounters: AccessibilityTransportCounters;
    };
    notifications: Notification[];
    marqueeItems: Marquee[];
    articles: Article['attributes'][];
};
