import { AsyncActionCreatorConfig, createAsyncActionCreator } from 'store/actionCreators';
import * as userRequests from 'store/requests/userRequests';

import { Empty } from 'types/generic';
import { ThunkResult } from 'types/state';
import { AuthUserData, DEAUTH_USER } from 'types/user';

export const validateUser = (
  additionalConfig: AsyncActionCreatorConfig<AuthUserData, Empty> = {}
): ThunkResult => (dispatch) => createAsyncActionCreator(
  dispatch, 'AUTH_USER',
  () => userRequests.validateUserRequest(),
  additionalConfig
);

export const signOutUser = (): ThunkResult => (dispatch): void => {
  dispatch({ type: DEAUTH_USER, status: 'REQUEST', payload: { data: {} } });
};
