import { Dispatch } from 'redux';
import { createAsyncActionCreator } from 'store/actionCreators';
import { DEAUTH_USER, AuthUserData, UserActions } from 'types/user';

import * as userRequests from 'store/requests/userRequests';

export const validateUser = () => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<AuthUserData>(
  dispatch, 'AUTH_USER',
  userRequests.validateUserRequest()
);

export const signOutUser = () => (dispatch: Dispatch<UserActions>): void => {
  dispatch({ type: DEAUTH_USER, status: 'REQUEST', payload: { data: undefined } });
};
