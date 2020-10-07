import { authTokenName } from '../constants';

const ActionTypes = {
  // Auth user
  AUTH_USER_REQUEST: 'AUTH_USER_REQUEST',
  AUTH_USER_SUCCESS: 'AUTH_USER_SUCCESS',
  AUTH_USER_FAILURE: 'AUTH_USER_FAILURE',

  // Deauth user
  DEAUTH_USER_REQUEST: 'DEAUTH_USER_REQUEST',
  DEAUTH_USER_SUCCESS: 'DEAUTH_USER_SUCCESS',
  DEAUTH_USER_FAILURE: 'DEAUTH_USER_FAILURE',

  // Search
  SEARCH_REQUEST: 'SEARCH_REQUEST',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  SEARCH_FAILURE: 'SEARCH_FAILURE',

  // Fetch resource
  FETCH_RESOURCE_REQUEST: 'FETCH_RESOURCE_REQUEST',
  FETCH_RESOURCE_SUCCESS: 'FETCH_RESOURCE_SUCCESS',
  FETCH_RESOURCE_FAILURE: 'FETCH_RESOURCE_FAILURE',

  // Fetch resources
  FETCH_RESOURCES_REQUEST: 'FETCH_RESOURCES_REQUEST',
  FETCH_RESOURCES_SUCCESS: 'FETCH_RESOURCES_SUCCESS',
  FETCH_RESOURCES_FAILURE: 'FETCH_RESOURCES_FAILURE',

  // Fetch user
  FETCH_USER_REQUEST: 'FETCH_USER_REQUEST',
  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
  FETCH_USER_FAILURE: 'FETCH_USER_FAILURE',

  // Fetch users
  FETCH_USERS_REQUEST: 'FETCH_USERS_REQUEST',
  FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
  FETCH_USERS_FAILURE: 'FETCH_USERS_FAILURE',
};

// Gets token from localStorage
export function getBearerTokenHeader() {
  return ({ Authorization: `Bearer ${localStorage.getItem(authTokenName)}` });
}

// Sets token in localStorage
export function setBearerToken(token) {
  localStorage.setItem(authTokenName, token);
}

export default ActionTypes;