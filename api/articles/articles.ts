import { fetchApi } from 'api/utils/fetch';

export const articlesApi = {
    getArticles: () => (
        fetchApi('https://transport-cms.ekaterinburg.io/api/articles', { dataField: 'data' })
    ),
    getArticle: (id: number) => (
        fetchApi(`https://transport-cms.ekaterinburg.io/api/articles/${id}`, { dataField: 'vehicles' })
    ),
};
