import React from 'react';
import classNames from 'classnames/bind';
import parseMarkdown from './parseMarkdown';

import { ArticleProps } from './Article.types';
import Link from 'next/link';

import { Feedback } from 'components/UI/Feedback/Feedback';

import styles from './Article.module.css';

const cn = classNames.bind(styles);

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
                    {description && <div dangerouslySetInnerHTML={{ __html: parseMarkdown(description) }} />}
                </div>
                {sidebar !== undefined && <aside className={cn(styles.ArticleAside)}>
                    {external && (
                        <div className={cn(styles.ArticleAsideFeedback)}>
                            <Feedback size="l" onClick={onFeedbackClick} />
                        </div>
                    )}
                    {sidebar && <div dangerouslySetInnerHTML={{ __html: parseMarkdown(sidebar) }} />}
                </aside>}
            </article>
        </div>
    )
}
