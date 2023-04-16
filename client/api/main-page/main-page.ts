import { fetchApi } from 'api/utils/fetch';

export const MainPageApi = {
    getCards: () => {
        return fetchApi(
            'https://transport-cms.ekaterinburg.io/api/cards/?populate=backgroundImage',
            { dataField: 'data' },
        );
    },

    getMarqueeItems: () => {
        return fetchApi('https://transport-cms.ekaterinburg.io/api/marquees', {
            dataField: 'data',
        });
    },

    getNotifications: () => {
        return fetchApi('https://transport-cms.ekaterinburg.io/api/notifications', {
            dataField: 'data',
        });
    },
};
