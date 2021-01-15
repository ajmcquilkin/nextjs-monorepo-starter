import { Dispatch } from 'redux';
import { createAsyncActionCreator } from 'store/actionCreators';
import { Post, PostStatus, PostActionTypes } from 'types/post';

import * as postRequests from 'store/requests/postRequests';

export const fetchWithStatus = (status: PostStatus) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator(
  dispatch, PostActionTypes.FETCH_POSTS,
  postRequests.fetchWithStatusRequest(status)
);

export const fetchSubmissions = () => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator(
  dispatch, PostActionTypes.FETCH_POSTS,
  postRequests.fetchSubmissionsRequest(),
  { failureCallback: null }
);

export const fetchReview = () => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator(
  dispatch, PostActionTypes.FETCH_POSTS,
  postRequests.fetchPostsToReviewRequest(),
  { failureCallback: null }
);

export const createItem = (fields: Post) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator(
  dispatch, PostActionTypes.FETCH_POST,
  postRequests.createItemRequest(fields),
);

export const fetchItemById = (id: string, successCallback: (res: any) => void) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator(
  dispatch, PostActionTypes.FETCH_POST,
  postRequests.fetchItemByIdRequest(id),
  { successCallback }
);

export const updateItemById = (id: string, update: Partial<Post>, successCallback: (res: any) => void) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator(
  dispatch, PostActionTypes.FETCH_POST,
  postRequests.updateItemByIdRequest(id, update),
  { successCallback }
);

export const deleteItemByID = (id: string) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator(
  dispatch, PostActionTypes.DELETE_POST,
  postRequests.deleteItemByIdRequest(id),
  { additionalPayloadFields: { id }, },
);
