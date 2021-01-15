import { Dispatch } from 'redux';
import { createAsyncActionCreator } from 'store/actionCreators';

import { Empty } from 'types/generic';
import {
  Post, PostStatus,
  FetchPostData, FetchPostsData, DeletePostData
} from 'types/post';

import * as postRequests from 'store/requests/postRequests';

export const fetchWithStatus = (
  status: PostStatus
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchPostData>(
  dispatch, 'FETCH_POST',
  postRequests.fetchWithStatusRequest(status)
);

export const fetchSubmissions = (

) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchPostData>(
  dispatch, 'FETCH_POST',
  postRequests.fetchSubmissionsRequest(),
  { failureCallback: null }
);

export const fetchReview = (

) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchPostsData>(
  dispatch, 'FETCH_POSTS',
  postRequests.fetchPostsToReviewRequest(),
  { failureCallback: null }
);

export const createItem = (
  fields: Post
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchPostData>(
  dispatch, 'FETCH_POST',
  postRequests.createItemRequest(fields),
);

export const fetchItemById = (
  id: string,
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchPostData>(
  dispatch, 'FETCH_POST',
  postRequests.fetchItemByIdRequest(id)
);

export const updateItemById = (
  id: string,
  update: Partial<Post>,
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchPostData>(
  dispatch, 'FETCH_POST',
  postRequests.updateItemByIdRequest(id, update)
);

export const deleteItemByID = (
  id: string
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<Empty, DeletePostData>(
  dispatch, 'DELETE_POST',
  postRequests.deleteItemByIdRequest(id),
  { additionalPayloadFields: { id }, },
);
