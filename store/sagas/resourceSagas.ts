import {
  put, call, takeLatest, fork
} from 'redux-saga/effects';

import * as resourceRequests from 'store/requests/resourceRequests';
import { getErrorPayload } from 'utils/store';

import { ResourceActions, FetchResourceData } from 'types/resource';
import { Actions, RequestReturnType } from 'types/state';

/* -------- Effects -------- */

function* createResource(action: ResourceActions) {
  if (action.type !== 'CREATE_RESOURCE') return;
  if (action.status !== 'REQUEST') return;

  try {
    const response: RequestReturnType<FetchResourceData> = yield call(resourceRequests.createResource, action.payload.data.fields);
    yield put<Actions>({ type: 'CREATE_RESOURCE', payload: { data: { resource: response.data.data.resource } }, status: 'SUCCESS' });
  } catch (error) {
    yield put<Actions>({ type: 'CREATE_RESOURCE', payload: getErrorPayload(error), status: 'FAILURE' });
  }
}

function* fetchResourceById(action: ResourceActions) {
  if (action.type !== 'FETCH_RESOURCE') return;
  if (action.status !== 'REQUEST') return;

  try {
    const response: RequestReturnType<FetchResourceData> = yield call(resourceRequests.fetchResourceByIdRequest, action.payload.data.id);
    yield put<Actions>({ type: 'FETCH_RESOURCE', payload: { data: { resource: response.data.data.resource } }, status: 'SUCCESS' });
  } catch (error) {
    yield put<Actions>({ type: 'FETCH_RESOURCE', payload: getErrorPayload(error), status: 'FAILURE' });
  }
}

function* updateResourceById(action: ResourceActions) {
  if (action.type !== 'UPDATE_RESOURCE') return;
  if (action.status !== 'REQUEST') return;

  try {
    const response: RequestReturnType<FetchResourceData> = yield call(resourceRequests.updateResourceByIdRequest, action.payload.data.id, action.payload.data.fields);
    yield put<Actions>({ type: 'UPDATE_RESOURCE', payload: { data: { resource: response.data.data.resource } }, status: 'SUCCESS' });
  } catch (error) {
    yield put<Actions>({ type: 'UPDATE_RESOURCE', payload: getErrorPayload(error), status: 'FAILURE' });
  }
}

function* deleteResourceById(action: ResourceActions) {
  if (action.type !== 'DELETE_RESOURCE') return;
  if (action.status !== 'REQUEST') return;

  try {
    yield call(resourceRequests.deleteResourceByIdRequest, action.payload.data.id);
    yield put<Actions>({ type: 'DELETE_RESOURCE', payload: { data: { id: action.payload.data.id } }, status: 'SUCCESS' });
  } catch (error) {
    yield put<Actions>({ type: 'DELETE_RESOURCE', payload: getErrorPayload(error), status: 'FAILURE' });
  }
}

/* -------- Watchers -------- */

function* watchCreateResourceById() {
  yield takeLatest((a: Actions): boolean => (a.type === 'CREATE_RESOURCE' && a.status === 'REQUEST'), createResource);
}

function* watchFetchResourceById() {
  yield takeLatest((a: Actions): boolean => (a.type === 'FETCH_RESOURCE' && a.status === 'REQUEST'), fetchResourceById);
}

function* watchUpdateResourceById() {
  yield takeLatest((a: Actions): boolean => (a.type === 'UPDATE_RESOURCE' && a.status === 'REQUEST'), updateResourceById);
}

function* watchDeleteResourceById() {
  yield takeLatest((a: Actions): boolean => (a.type === 'CREATE_RESOURCE' && a.status === 'REQUEST'), deleteResourceById);
}

/* -------- Global -------- */

export default function* resourceSaga() {
  yield fork(watchCreateResourceById);
  yield fork(watchFetchResourceById);
  yield fork(watchUpdateResourceById);
  yield fork(watchDeleteResourceById);
}
