export interface Article {
    id: number,
    attributes: {
        title: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
        url: string;
    }
}
