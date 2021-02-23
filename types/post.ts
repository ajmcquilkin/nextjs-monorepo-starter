import { Document } from 'mongoose';
import { Action } from './state';

/* -------- Generic -------- */

export type PostStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'published';
export type PostPublishType = 'news' | 'announcement' | 'event';
export type PostRejectionReason = 'guidelines' | 'errors' | 'event' | 'subject' | 'other';

export type PostStatusColors = {
  primary: string,
  secondary: string,
  tertirary: string
}

export interface Post {
  fromName: string,
  fromAddress: string,
  submitterNetId: string,

  type: PostPublishType,
  fullContent: string,
  briefContent: string,
  url: string,
  requestedPublicationDate: number,
  recipientGroups: string[],
  featuredImage: string,
  eventDate: number | null,

  status: PostStatus,
  dateItemCreated: Date,
  lastEdited: number,

  rejectionComment: string | null,
  rejectionReason: PostRejectionReason | null,

  _id: string
}

export type PostDocument = Post & Document<string>;

/* -------- State -------- */

export interface PostState {
  posts: Record<string, Post>,
  results: string[],
  numResults: number
}

/* -------- Action Types -------- */

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST_RESULTS = 'FETCH_POST_RESULTS';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

export type FetchPostsData = { posts: Post[] };
export type FetchPostResultsData = { posts: Post[], results: string[], numResults: number };
export type FetchPostData = { post: Post };
export type DeletePostData = { id: string };

type FetchPostsAction = Action<typeof FETCH_POSTS, FetchPostsData>
type FetchPostResultsAction = Action<typeof FETCH_POST_RESULTS, FetchPostResultsData>
type FetchPostAction = Action<typeof FETCH_POST, FetchPostData>
type DeletePostAction = Action<typeof DELETE_POST, DeletePostData>

export type PostActions = FetchPostsAction | FetchPostResultsAction | FetchPostAction | DeletePostAction;
export type PostActionTypes = typeof FETCH_POST | typeof FETCH_POST_RESULTS | typeof FETCH_POSTS | typeof DELETE_POST;
