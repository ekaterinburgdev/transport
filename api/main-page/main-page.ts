import { fetchApi } from 'api/utils/fetch';

export const MainPageApi = {
    getCards: () => (
        fetchApi('https://transport-cms.ekaterinburg.io/api/cards', { dataField: 'data' })
    ),
    getMarqueeItems: () => (
        fetchApi('https://transport-cms.ekaterinburg.io/api/marquees', { dataField: 'data' })
    ),
    getNotifications: () => (
        fetchApi('https://transport-cms.ekaterinburg.io/api/notifications', { dataField: 'data' })
    ),
};
