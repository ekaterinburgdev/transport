import { fetchApi } from 'api/utils/fetch';
import { STRAPI_URL } from 'transport-common/strapi/constants';

export const articlesApi = {
    getArticles: () =>
        fetchApi(`${STRAPI_URL}/api/articles?fields=slug`, {
            dataField: 'data',
        }),
    getArticle: (slug: string) =>
        fetchApi(`${STRAPI_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}`, {
            dataField: 'data',
        }),
    getAllArticles: () => fetchApi(`${STRAPI_URL}/api/articles`, { dataField: 'data' }),
};
