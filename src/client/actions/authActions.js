import axios from 'axios';
import { ROOT_URL } from '../constants';
import ActionTypes, { setBearerToken } from './index';

/**
 * sends them to the backend server for authentication
 * If authentication succeeds, the provided cookie will be placed locally
 *  the user's authentication status will be updated
 */
export function signInUser(email, password) {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.AUTH_USER_REQUEST });

    axios.post(`${ROOT_URL}/auth/signin`, { email, password }).then((response) => {
      if (response.data.token) setBearerToken(response.data.token);
      dispatch({ type: ActionTypes.AUTH_USER_SUCCESS, payload: response.data.user });
      resolve();
    }).catch((error) => {
      dispatch({ type: ActionTypes.AUTH_USER_FAILURE, payload: error.response.data });
      reject(error);
    });
  });
}

/**
 * A function that clears a user's authentication status
 */
export function signOutUser() {
  return (dispatch) => {
    localStorage.clear();

    // Run any additional deauth processes here (dispatch DEAUTH_USER_REQUEST if async)

    dispatch({ type: ActionTypes.DEAUTH_USER_SUCCESS });
  };
}
