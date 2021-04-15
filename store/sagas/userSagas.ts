import { useRouter } from 'next/router';
import { put, call, takeLatest } from 'redux-saga/effects';

import * as userRequests from 'store/requests/userRequests';

import { casInstance } from 'utils/auth';
import { getErrorPayload } from 'utils/store';

import { Actions, ActionTypes, RequestReturnType } from 'types/state';
import { UserActions, AuthUserData } from 'types/user';

/* -------- Effects -------- */

function* authUser(action: UserActions) {
  if (action.type !== 'AUTH_USER') return;
  if (action.status !== 'REQUEST') return;

  try {
    const response: RequestReturnType<AuthUserData> = yield call(userRequests.validateUserRequest);

    if (!response.data.data.isAuthenticated) {
      const router = useRouter();
      router.push(casInstance.getAuthenticationServerUrl());
    }

    yield put<Actions>({ type: 'AUTH_USER', payload: { data: response.data.data }, status: 'SUCCESS' });
  } catch (error) {
    yield put<Actions>({ type: 'AUTH_USER', payload: getErrorPayload(error), status: 'FAILURE' });
  }
}

/* -------- Watchers -------- */

function* watchAuthUser() {
  yield takeLatest<ActionTypes>('AUTH_USER', authUser);
}

/* -------- Global -------- */

export default function* userSaga() {
  yield watchAuthUser();
}
