import { createAsyncActionCreator } from 'store/actionCreators';
import * as userRequests from 'store/requests/userRequests';

import { ThunkResult } from 'types/state';
import { DEAUTH_USER, AuthUserData } from 'types/user';

export const validateUser = (
  additionalConfig = {}
): ThunkResult => (dispatch) => createAsyncActionCreator<AuthUserData>(
  dispatch, 'AUTH_USER',
  () => userRequests.validateUserRequest(),
  additionalConfig
);

export const signOutUser = (): ThunkResult => (dispatch): void => {
  dispatch({ type: DEAUTH_USER, status: 'REQUEST', payload: { data: {} } });
};
