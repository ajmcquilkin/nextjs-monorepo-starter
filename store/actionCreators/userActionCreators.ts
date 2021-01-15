import { Dispatch } from 'redux';
import { RequestStatus } from 'store/helpers';
import { createAsyncActionCreator } from 'store/actionCreators';
import { UserActionTypes } from 'types/user';

import * as userRequests from 'store/requests/userRequests';

export const validateUser = () => (dispatch: Dispatch): Promise<void> => createAsyncActionCreator(
  dispatch, UserActionTypes.AUTH_USER,
  userRequests.validateUserRequest()
);

export const signOutUser = () => (dispatch: Dispatch): void => {
  dispatch({ type: `${UserActionTypes.DEAUTH_USER}_${RequestStatus.success}` });
};
