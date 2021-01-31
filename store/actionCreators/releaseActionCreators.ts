import { Dispatch } from 'redux';
import { createAsyncActionCreator } from 'store/actionCreators';

import * as releaseRequests from 'store/requests/releaseRequests';

import { Empty } from 'types/generic';
import {
  Release,
  FetchReleaseData, DeleteReleaseData
} from 'types/release';

export const fetchReleaseById = (
  id: string,
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchReleaseData>(
  dispatch, 'FETCH_RELEASE',
  releaseRequests.fetchReleaseByIdRequest(id)
);

export const fetchReleaseByDate = (
  date: number,
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchReleaseData>(
  dispatch, 'FETCH_RELEASE',
  releaseRequests.fetchReleaseByDateRequest(date)
);

export const deleteReleaseById = (
  id: string,
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<Empty, DeleteReleaseData>(
  dispatch, 'DELETE_POST',
  releaseRequests.deleteReleaseByIdRequest(id),
  { additionalPayloadFields: { id }, },
);

export const createRelease = (
  fields: Pick<Release, 'subject' | 'headerImage' | 'imageCaption' | 'quoteOfDay' | 'quotedContext' | 'featuredPost'>
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchReleaseData>(
  dispatch, 'FETCH_RELEASE',
  releaseRequests.createReleaseRequest(fields),
);

export const updateReleaseById = (
  id: string,
  update: Partial<Release>,
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator(
  dispatch, 'FETCH_RELEASE',
  releaseRequests.updateReleaseByIdRequest(id, update)
);
