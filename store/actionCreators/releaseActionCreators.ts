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
  additionalConfig = {}
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchReleaseData>(
  dispatch, 'FETCH_RELEASE',
  releaseRequests.fetchReleaseByIdRequest(id),
  additionalConfig
);

export const fetchReleaseByDate = (
  date: number,
  additionalConfig = {}
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchReleaseData>(
  dispatch, 'FETCH_RELEASE',
  releaseRequests.fetchReleaseByDateRequest(date),
  additionalConfig
);

export const deleteReleaseById = (
  id: string,
  additionalConfig = {}
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<Empty, DeleteReleaseData>(
  dispatch, 'DELETE_POST',
  releaseRequests.deleteReleaseByIdRequest(id),
  { ...additionalConfig, additionalPayloadFields: { id }, },
);

export const createRelease = (
  fields: Pick<Release, 'subject' | 'headerImage' | 'imageCaption' | 'quoteOfDay' | 'quotedContext' | 'featuredPost'>,
  additionalConfig = {}
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<FetchReleaseData>(
  dispatch, 'FETCH_RELEASE',
  releaseRequests.createReleaseRequest(fields),
  additionalConfig
);

export const updateReleaseById = (
  id: string,
  update: Partial<Release>,
  additionalConfig = {}
) => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator(
  dispatch, 'FETCH_RELEASE',
  releaseRequests.updateReleaseByIdRequest(id, update),
  additionalConfig
);
