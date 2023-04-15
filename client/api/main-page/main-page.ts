import { fetchApi } from 'api/utils/fetch';

const IS_TEST = process.env.NODE_ENV !== 'production';

export const MainPageApi = {
    getCards: () => {
        if (IS_TEST) return require('../../__fixtures__/cards.json');
        return fetchApi('https://transport-cms.ekaterinburg.io/api/cards/?populate=backgroundImage', { dataField: 'data' });
    },

    getMarqueeItems: () => {
        if (IS_TEST) return require('../../__fixtures__/marquee-items.json');
        return fetchApi('https://transport-cms.ekaterinburg.io/api/marquees', { dataField: 'data' });
    },

    getNotifications: () => {
        if (IS_TEST) return require('../../__fixtures__/notifications.json');
        return fetchApi('https://transport-cms.ekaterinburg.io/api/notifications', { dataField: 'data' });
    }
};
