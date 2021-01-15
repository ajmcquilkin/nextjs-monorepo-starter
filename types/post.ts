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

export interface PostState {
  posts: { [id: string]: Post },
  results: string[],
  numResults: number
}

export type PostStatus = 'pending' | 'approved' | 'rejected' | 'draft';

export enum PostActionTypes {
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_POST = 'FETCH_POST',
  DELETE_POST = 'DELETE_POST'
}
