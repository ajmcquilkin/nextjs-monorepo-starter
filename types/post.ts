import { Document } from 'mongoose';
import { Action } from './state';

/* -------- Generic -------- */

export type PostStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'published';
export type PostPublishType = 'news' | 'announcement' | 'event';

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

  status: PostStatus,
  dateItemCreated: Date,
  lastEdited: number,
  reviewComment: string,

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
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

export type FetchPostsData = Post[];
export type FetchPostData = Post;
export type DeletePostData = { id: string };

type FetchPostsAction = Action<typeof FETCH_POSTS, FetchPostsData>
type FetchPostAction = Action<typeof FETCH_POST, FetchPostData>
type DeletePostAction = Action<typeof DELETE_POST, DeletePostData>

export type PostActions = FetchPostsAction | FetchPostAction | DeletePostAction;
export type PostActionTypes = typeof FETCH_POST | typeof FETCH_POSTS | typeof DELETE_POST;
