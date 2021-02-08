import { createAsyncActionCreator } from 'store/actionCreators';
import * as postRequests from 'store/requests/postRequests';

import { Empty } from 'types/generic';
import { Post, PostStatus, DeletePostData } from 'types/post';
import { ThunkResult } from 'types/state';

export const fetchAllPosts = (
  additionalConfig = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_POSTS',
  () => postRequests.fetchAllPostsRequest(),
  additionalConfig
);

export const fetchWithStatus = (
  status: PostStatus,
  additionalConfig = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_POST_RESULTS',
  () => postRequests.fetchWithStatusRequest(status),
  additionalConfig
);

export const fetchPostsByDate = (
  date: number,
  additionalConfig = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_POST_RESULTS',
  () => postRequests.fetchPostsByDateRequest(date),
  additionalConfig
);

export const createPost = (
  fields: Omit<Post, '_id'>,
  additionalConfig = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_POST',
  () => postRequests.createPostRequest(fields),
  additionalConfig
);

export const fetchPostById = (
  id: string,
  additionalConfig = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_POST',
  () => postRequests.fetchPostByIdRequest(id),
  additionalConfig
);

export const updatePostById = (
  id: string,
  update: Partial<Post>,
  additionalConfig = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_POST',
  () => postRequests.updatePostByIdRequest(id, update),
  additionalConfig
);

export const deletePostById = (
  id: string,
  additionalConfig = {}
): ThunkResult => (dispatch) => createAsyncActionCreator<Empty, DeletePostData>(
  dispatch, 'DELETE_POST',
  () => postRequests.deletePostByIdRequest(id),
  { ...additionalConfig, additionalPayloadFields: { id }, }
);
