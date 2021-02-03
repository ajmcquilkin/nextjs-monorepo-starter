import { createAsyncActionCreator } from 'store/actionCreators';

import * as releaseRequests from 'store/requests/releaseRequests';

import { Empty } from 'types/generic';
import { Release, DeleteReleaseData } from 'types/release';
import { ThunkResult } from 'types/state';

export const fetchReleaseById = (
  id: string,
  additionalConfig = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_RELEASE',
  () => releaseRequests.fetchReleaseByIdRequest(id),
  additionalConfig
);

export const fetchReleaseByDate = (
  date: number,
  additionalConfig = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_RELEASE',
  () => releaseRequests.fetchReleaseByDateRequest(date),
  additionalConfig
);

export const createRelease = (
  fields: Pick<Release, 'subject' | 'headerImage' | 'imageCaption' | 'quoteOfDay' | 'quotedContext' | 'featuredPost'>,
  additionalConfig = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_RELEASE',
  () => releaseRequests.createReleaseRequest(fields),
  additionalConfig
);

export const updateReleaseById = (
  id: string,
  update: Partial<Release>,
  additionalConfig = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'FETCH_RELEASE',
  () => releaseRequests.updateReleaseByIdRequest(id, update),
  additionalConfig
);

export const deleteReleaseById = (
  id: string,
  additionalConfig = {}
): ThunkResult => (dispatch) => createAsyncActionCreator<Empty, DeleteReleaseData>(
  dispatch, 'DELETE_POST',
  () => releaseRequests.deleteReleaseByIdRequest(id),
  { ...additionalConfig, additionalPayloadFields: { id }, },
);
