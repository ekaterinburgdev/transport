export interface Article {
    id: number;
    attributes: {
        title: string;
        description: string;
        sidebar: string;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
        slug: string;
    };
}
