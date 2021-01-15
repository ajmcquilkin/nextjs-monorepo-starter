import { Dispatch } from 'redux';
import { createAsyncActionCreator } from 'store/actionCreators';
import { DEAUTH_USER } from 'types/user';

import * as userRequests from 'store/requests/userRequests';

export const validateUser = () => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator<any>(
  dispatch, 'AUTH_USER',
  userRequests.validateUserRequest()
);

export const signOutUser = () => (dispatch: Dispatch): void => {
  dispatch({ type: DEAUTH_USER, status: 'REQUEST' });
};
