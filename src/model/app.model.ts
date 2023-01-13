export interface NewsFeed {
    id: string;
    headline: string;
    date: Date;
    canonicalLink: string;
    standfirst: string;
    thumbnail: {
        id: string;
        type: string;
        link: { media: string; self: string };
        width: number;
        height: number;
    };
}