import { fetchApi } from 'api/utils/fetch';

export const articlesApi = {
    getArticles: () =>
        fetchApi('https://transport-cms.ekaterinburg.city/api/articles?fields=slug', {
            dataField: 'data',
        }),
    getArticle: (slug: string) =>
        fetchApi(
            `https://transport-cms.ekaterinburg.city/api/articles?filters[slug][$eq]=${encodeURIComponent(
                slug,
            )}`,
            { dataField: 'data' },
        ),
};
