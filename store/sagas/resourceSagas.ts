import {
  StrictEffect, AllEffect,
  put, call, takeLatest, all
} from 'redux-saga/effects';

import * as resourceRequests from 'store/requests/resourceRequests';
import { getErrorPayload } from 'utils/store';

import { ResourceActions, FetchResourceData } from 'types/resource';
import { Actions, ActionTypes, RequestReturnType } from 'types/state';

/* -------- Effects -------- */

function* createResource(action: ResourceActions) {
  if (action.type !== 'CREATE_RESOURCE_REQUEST') return;

  try {
    const response: RequestReturnType<FetchResourceData> = yield call(resourceRequests.createResource, action.payload.data.fields);
    yield put<Actions>({ type: 'CREATE_RESOURCE_SUCCESS', payload: { data: { resource: response.data.data.resource } } });
  } catch (error) {
    yield put<Actions>({ type: 'CREATE_RESOURCE_FAILURE', payload: getErrorPayload(error) });
  }
}

function* fetchResourceById(action: ResourceActions) {
  if (action.type !== 'FETCH_RESOURCE_REQUEST') return;

  try {
    const response: RequestReturnType<FetchResourceData> = yield call(resourceRequests.fetchResourceByIdRequest, action.payload.data.id);
    yield put<Actions>({ type: 'FETCH_RESOURCE_SUCCESS', payload: { data: { resource: response.data.data.resource } } });
  } catch (error) {
    yield put<Actions>({ type: 'FETCH_RESOURCE_FAILURE', payload: getErrorPayload(error) });
  }
}

function* updateResourceById(action: ResourceActions) {
  if (action.type !== 'UPDATE_RESOURCE_REQUEST') return;

  try {
    const response: RequestReturnType<FetchResourceData> = yield call(resourceRequests.updateResourceByIdRequest, action.payload.data.id, action.payload.data.fields);
    yield put<Actions>({ type: 'UPDATE_RESOURCE_SUCCESS', payload: { data: { resource: response.data.data.resource } } });
  } catch (error) {
    yield put<Actions>({ type: 'UPDATE_RESOURCE_FAILURE', payload: getErrorPayload(error) });
  }
}

function* deleteResourceById(action: ResourceActions) {
  if (action.type !== 'DELETE_RESOURCE_REQUEST') return;

  try {
    yield call(resourceRequests.deleteResourceByIdRequest, action.payload.data.id);
    yield put<Actions>({ type: 'DELETE_RESOURCE_SUCCESS', payload: { data: { id: action.payload.data.id } } });
  } catch (error) {
    yield put<Actions>({ type: 'DELETE_RESOURCE_FAILURE', payload: getErrorPayload(error) });
  }
}

/* -------- Watchers -------- */

function* watchCreateResourceById() {
  yield takeLatest<ActionTypes>('CREATE_RESOURCE_REQUEST', createResource);
}

function* watchFetchResourceById() {
  yield takeLatest<ActionTypes>('FETCH_RESOURCE_REQUEST', fetchResourceById);
}

function* watchUpdateResourceById() {
  yield takeLatest<ActionTypes>('UPDATE_RESOURCE_REQUEST', updateResourceById);
}

function* watchDeleteResourceById() {
  yield takeLatest<ActionTypes>('DELETE_RESOURCE_REQUEST', deleteResourceById);
}

/* -------- Global -------- */

export default function* resourceSaga(): Generator<AllEffect<Generator<StrictEffect<any, any>, void, void>>, void, any> {
  yield all([
    watchCreateResourceById(),
    watchFetchResourceById(),
    watchUpdateResourceById(),
    watchDeleteResourceById(),
  ]);
}
