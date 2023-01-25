import type { Card, Marquee, Notification } from 'api/main-page/main-page.types';

export type MainPageTypes = {
    cards: Card[],
    notifications: Notification[],
    marqueeItems: Marquee[]
};
