import { useRouter } from 'next/router';
import {
  StrictEffect, AllEffect,
  put, call, takeLatest, all
} from 'redux-saga/effects';

import * as userRequests from 'store/requests/userRequests';

import { casInstance } from 'utils/auth';
import { getErrorPayload } from 'utils/store';

import { Actions, ActionTypes, RequestReturnType } from 'types/state';
import { UserActions, AuthUserData } from 'types/user';

/* -------- Effects -------- */

function* authUser(action: UserActions) {
  if (action.type !== 'AUTH_USER_REQUEST') return;

  try {
    const response: RequestReturnType<AuthUserData> = yield call(userRequests.validateUserRequest);

    if (!response.data.data.isAuthenticated) {
      const router = useRouter();
      router.push(casInstance.getAuthenticationServerUrl());
    }

    yield put<Actions>({ type: 'AUTH_USER_SUCCESS', payload: { data: response.data.data } });
  } catch (error) {
    yield put<Actions>({ type: 'AUTH_USER_FAILURE', payload: getErrorPayload(error) });
  }
}

/* -------- Watchers -------- */

function* watchAuthUser() {
  yield takeLatest<ActionTypes>('AUTH_USER_REQUEST', authUser);
}

/* -------- Global -------- */

export default function* resourceSaga(): Generator<AllEffect<Generator<StrictEffect<any, any>, void, void>>, void, any> {
  try {
    yield all([
      watchAuthUser()
    ]);
  } catch (error) {
    console.error(error);
  }
}
