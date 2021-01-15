import { GenericPair } from './generic';
import { Action } from './state';

/* -------- Generic -------- */

export interface Post {
  fromName: string,
  subject: string,
  submitterNetId: string,

  postType: string,
  fullContent: string,
  briefContent: string,
  url: string,
  requestedPublicationDate: Date,
  recipientGroups: string[],

  publishOrder: number,
  postStatus: string,
  dateItemCreated: Date,
  lastEdited: Date,
  reviewComment: string,

  _id?: string
}

/* -------- State -------- */

export interface PostState {
  posts: GenericPair<Post>,
  results: string[],
  numResults: number
}

/* -------- Action Types -------- */

export type PostStatus = 'pending' | 'approved' | 'rejected' | 'draft';

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
