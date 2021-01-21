import { Dispatch } from 'redux';
import { createAsyncActionCreator } from 'store/actionCreators';

import * as postRequests from 'store/requests/postRequests';

import { Empty } from 'types/generic';
import {
  Post, PostStatus,
  FetchPostData, FetchPostsData, DeletePostData
} from 'types/post';

export const fetchAllPosts = (

) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchPostsData>(
  dispatch, 'FETCH_POSTS',
  postRequests.fetchAllPostsRequest()
);

export const fetchWithStatus = (
  status: PostStatus
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchPostData>(
  dispatch, 'FETCH_POST',
  postRequests.fetchWithStatusRequest(status)
);

export const fetchSubmissions = (

) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchPostData>(
  dispatch, 'FETCH_POST',
  postRequests.fetchSubmissionsRequest()
);

export const fetchReview = (

) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchPostsData>(
  dispatch, 'FETCH_POSTS',
  postRequests.fetchPostsToReviewRequest()
);

export const createPost = (
  fields: Omit<Post, '_id'>
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchPostData>(
  dispatch, 'FETCH_POST',
  postRequests.createPostRequest(fields),
);

export const fetchPostById = (
  id: string,
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchPostData>(
  dispatch, 'FETCH_POST',
  postRequests.fetchPostByIdRequest(id)
);

export const updatePostById = (
  id: string,
  update: Partial<Post>,
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchPostData>(
  dispatch, 'FETCH_POST',
  postRequests.updatePostByIdRequest(id, update)
);

export const deletePostById = (
  id: string
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<Empty, DeletePostData>(
  dispatch, 'DELETE_POST',
  postRequests.deletePostByIdRequest(id),
  { additionalPayloadFields: { id }, },
);
