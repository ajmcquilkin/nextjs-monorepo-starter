import { createAsyncActionCreator } from 'store/actionCreators';

import * as releaseRequests from 'store/requests/releaseRequests';

import { Empty } from 'types/generic';
import { Release, FetchReleaseData, DeleteReleaseData } from 'types/release';
import { ThunkResult } from 'types/state';

export const fetchReleaseById = (
  id: string,
): ThunkResult => (dispatch) => createAsyncActionCreator<FetchReleaseData>(
  dispatch, 'FETCH_RELEASE',
  releaseRequests.fetchReleaseByIdRequest(id)
);

export const fetchReleaseByDate = (
  date: number,
): ThunkResult => (dispatch) => createAsyncActionCreator<FetchReleaseData>(
  dispatch, 'FETCH_RELEASE',
  releaseRequests.fetchReleaseByDateRequest(date)
);

export const deleteReleaseById = (
  id: string,
): ThunkResult => (dispatch) => createAsyncActionCreator<Empty, DeleteReleaseData>(
  dispatch, 'DELETE_POST',
  releaseRequests.deleteReleaseByIdRequest(id),
  { additionalPayloadFields: { id }, },
);

export const createRelease = (
  fields: Pick<Release, 'subject' | 'headerImage' | 'imageCaption' | 'quoteOfDay' | 'quotedContext' | 'featuredPost'>
): ThunkResult => (dispatch) => createAsyncActionCreator<FetchReleaseData>(
  dispatch, 'FETCH_RELEASE',
  releaseRequests.createReleaseRequest(fields),
);

export const updateReleaseById = (
  id: string,
  update: Partial<Release>,
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_RELEASE',
  releaseRequests.updateReleaseByIdRequest(id, update)
);
