import React from 'react';
import Head from 'next/head';

import { articlesApi } from 'api/articles/articles';
import { ArticleProps } from 'components/Articles/Article/Article.types';
import { Article } from 'components/Articles/Article/Article';

function ArticlePage({ title, description }: ArticleProps) {
    return (
        <>
        
            <Head>
                <title>Транспорт Екатеринбурга — {title}</title>
            </Head>

            <Article title={title} description={description} />
        </>
    );
}

export async function getStaticPaths() {
    const articles = (await articlesApi.getArticles()) || [];

    return {
        paths: articles.map(({ attributes: { slug } }) => ({ params: { slug } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const article = (await articlesApi.getArticle(params.slug)).at(0)?.attributes;

    return {
        props: { ...article },
    };
}

export default ArticlePage;
