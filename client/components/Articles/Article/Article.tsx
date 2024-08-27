import React from 'react';
import classNames from 'classnames/bind';
import md from 'markdown-it';
import { ArticleProps } from './Article.types';
import Link from 'next/link';

import styles from './Article.module.css';
import t from 'utils/typograph';
import { Feedback } from 'components/UI/Feedback/Feedback';

const cn = classNames.bind(styles);

function getContent(html) {
    return t(md({ html: true }).render(html));
}

export function Article({ title, description, sidebar, external, onFeedbackClick }: ArticleProps) {
    return (
        <div className={cn(styles.Article, { [styles.Article_external]: external })}>
            {!external && <div className={cn(styles.ArticleControls)}>
                <Link className={cn(styles.ArticleBack)} href="/">
                    <span className={cn(styles.ArticleBackArrow)}>←</span>
                    <span className={cn(styles.ArticleBackCaption)}>На главную транспорта</span>
                </Link>
                <Feedback onClick={onFeedbackClick} size="l" />
            </div>}
            <article className={cn(styles.ArticleContent)}>
                <div className={cn(styles.ArticleText)}>
                    {title && <h1 className={cn(styles.ArticleTitle)}>{title}</h1>}
                    {description && <div dangerouslySetInnerHTML={{ __html: getContent(description) }} />}
                </div>
                {sidebar !== undefined && <aside className={cn(styles.ArticleAside)}>
                    {external && (
                        <div className={cn(styles.ArticleAsideFeedback)}>
                            <Feedback size="l" onClick={onFeedbackClick} />
                        </div>
                    )}
                    {sidebar && <div dangerouslySetInnerHTML={{ __html: getContent(sidebar) }} />}
                </aside>}
            </article>
        </div>
    )
}
