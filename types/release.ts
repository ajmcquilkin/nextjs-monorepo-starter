import { Document } from 'mongoose';
import { DeletePostData, Post } from './post';
import { Action } from './state';

/* -------- Generic -------- */

export interface Release {
    date: number,

    subject: string,
    headerImage: string,
    headerImageCaption: string,
    headerImageAlt: string,

    quoteOfDay: string,
    quotedContext: string,
    featuredPost: string | null,

    news: string[],
    announcements: string[],
    events: string[],

    lastEdited: number,
    _id: string
}

export type ReleaseDocument = Release & Document<string>;
export type PopulatedRelease = { release: Release, posts: Post[] };
export type CreateReleaseType = Pick<Release, 'date' | 'subject' | 'headerImage' | 'headerImageCaption' | 'headerImageAlt'
    | 'quoteOfDay' | 'quotedContext' | 'featuredPost' | 'news' | 'announcements' | 'events'>;

/* -------- State -------- */

export interface ReleaseState {
    release: Release | null
}

/* -------- Action Types -------- */

export const FETCH_RELEASE = 'FETCH_RELEASE';
export const DELETE_RELEASE = 'DELETE_RELEASE';

export type FetchReleaseData = PopulatedRelease;
export type DeleteReleaseData = { id: string };

type FetchReleaseAction = Action<typeof FETCH_RELEASE, FetchReleaseData>
type DeleteReleaseAction = Action<typeof DELETE_RELEASE, DeletePostData>

export type ReleaseActions = FetchReleaseAction | DeleteReleaseAction;
export type ReleaseActionTypes = typeof FETCH_RELEASE | typeof DELETE_RELEASE;
