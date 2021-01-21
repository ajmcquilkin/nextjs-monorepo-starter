import { Document } from 'mongoose';
import { Post } from './post';

/* -------- Generic -------- */

export interface Release {
    date: number,
    subject: string,
    headerImage: string,
    quoteOfDay: string,
    quotedContext: string,
    featuredPost: Post | null,

    news: Post[],
    announcements: Post[],
    events: Post[],

    _id: string
}

export type ReleaseDocument = Release & Document<string>;

/* -------- Action Types -------- */

export type FetchReleaseData = Release;
export type DeleteReleaseData = { id: string };
