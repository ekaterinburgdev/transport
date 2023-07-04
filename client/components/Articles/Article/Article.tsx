import React from 'react';
import classNames from 'classnames/bind';
import md from 'markdown-it';
import { ArticleProps } from './Article.types';
import Link from 'next/link';

import styles from './Article.module.css';
import t from 'utils/typograph';

const cn = classNames.bind(styles);

export function Article({ title, description }: ArticleProps) {
    return (
        <article className={cn(styles.Article)}>
            <Link className={cn(styles.ArticleBack)} href="/">
                <span className={cn(styles.ArticleBackArrow)}>←</span>
                <span className={cn(styles.ArticleBackCaption)}>Назад</span>
            </Link>

            <h1 className={cn(styles.ArticleTitle)}>
                {title}
            </h1>

            <div
                className={cn(styles.ArticleContent)}
                dangerouslySetInnerHTML={{ __html: t(md().render(description)) }}
            />
        </article>
    )
}
