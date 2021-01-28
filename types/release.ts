import { Document } from 'mongoose';
import { DeletePostData, Post } from './post';
import { Action } from './state';

/* -------- Generic -------- */

export interface Release {
    date: number,
    subject: string,
    headerImage: string,
    imageCaption: string,
    quoteOfDay: string,
    quotedContext: string,
    featuredPost: string | null,

    news: string[],
    announcements: string[],
    events: string[],

    _id: string
}

export type ReleaseDocument = Release & Document<string>;

/* -------- State -------- */

export interface ReleaseState {
    release: Release | null
}

/* -------- Action Types -------- */

export const FETCH_RELEASE = 'FETCH_RELEASE';
export const DELETE_RELEASE = 'DELETE_RELEASE';

export type FetchReleaseData = { release: Release, posts: Post[] };
export type DeleteReleaseData = { id: string };

type FetchReleaseAction = Action<typeof FETCH_RELEASE, FetchReleaseData>
type DeleteReleaseAction = Action<typeof DELETE_RELEASE, DeletePostData>

export type ReleaseActions = FetchReleaseAction | DeleteReleaseAction;
export type ReleaseActionTypes = typeof FETCH_RELEASE | typeof DELETE_RELEASE;
