import ActionTypes, {
  requestStates, createAsyncActionCreator,
} from '.';
import { ROOT_URL } from '../constants';

export function checkUser() {
  console.log('Checking user');
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.AUTH_USER,
    {
      method: 'get',
      url: `${ROOT_URL}/auth/user`,
      withCredentials: true
    },
  );
}

/**
   * A function that clears a user's authentication status
*/
export function signOutUser() {
  return (dispatch) => {
    // Run any additional deauth processes here (dispatch DEAUTH_USER_REQUEST if async)
    dispatch({ type: `${ActionTypes.DEAUTH_USER}_${requestStates.SUCCESS}` });
  };
}
