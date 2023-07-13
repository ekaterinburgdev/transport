import type {
    Card,
    AccessibilityTransportCounters,
    Marquee,
    Notification
} from 'api/main-page/main-page.types';

export type MainPageTypes = {
    cards: Card[];
    trafficJams: number;
    a11yTransportCounters: AccessibilityTransportCounters,
    notifications: Notification[];
    marqueeItems: Marquee[];
};
