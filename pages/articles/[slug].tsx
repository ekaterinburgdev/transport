import React from 'react';
import Head from 'next/head';
import { articlesApi } from 'api/articles/articles';

function Article({ title, description }: any) {
    return (
        <>
            <Head>
                <title>
                    Транспорт Екатеринбурга —
                    {' '}
                    {title}
                </title>
            </Head>
            <div>
                <div>{title}</div>
                <div>{description}</div>
            </div>
        </>
    );
}
export async function getStaticPaths() {
    const articles = await articlesApi.getArticles();

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

export default Article;
