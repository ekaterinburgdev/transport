import React from 'react';
import classNames from 'classnames/bind';
import md from 'markdown-it';
import { ArticleProps } from './Article.types';
import Link from 'next/link';

import styles from './Article.module.css';
import t from 'utils/typograph';

const cn = classNames.bind(styles);

export function Article({ title, description, aside, external }: ArticleProps) {
    return (
        <div className={cn(styles.Article, { [styles.Article_external]: external })}>
            {!external && <Link className={cn(styles.ArticleBack)} href="/">
                <span className={cn(styles.ArticleBackArrow)}>←</span>
                <span className={cn(styles.ArticleBackCaption)}>Назад</span>
            </Link>}
            <article className={cn(styles.ArticleContent)}>
                <div>
                    {title && <h1 className={cn(styles.ArticleTitle)}>
                        {title}
                    </h1>}
                    {description && <div
                        dangerouslySetInnerHTML={{ __html: t(md({ html: true }).render(description)) }}
                    />}
                </div>
                {aside && <aside className={cn(styles.ArticleAside)}>
                    {aside}
                </aside>}
            </article>
        </div>
    )
}
