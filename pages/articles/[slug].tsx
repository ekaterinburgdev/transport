import React from 'react';
import Head from 'next/head';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Link from 'next/link';
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

            <div style={{
                maxWidth: 900,
                margin: '24px auto 80px',
                fontSize: 20,
                lineHeight: 1.3,
            }}
            >
                <div style={{ marginBottom: 40 }}><Link href="/">← Назад</Link></div>
                <h1>{title}</h1>

                <ReactMarkdown>
                    {description}
                </ReactMarkdown>
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
