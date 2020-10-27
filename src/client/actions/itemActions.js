import ActionTypes, { createAsyncActionCreator } from '.';
import { ROOT_URL } from '../constants';

/**
 * A function for fetching all items loaded into backend (or a given number based on backend parameters)
 */
export function fetchApproved() {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_ITEMS,
    {
      method: 'get',
      url: `${ROOT_URL}/items?status=approved`,
    },
  );
}
const redirect = () => {
  console.log('AUTH CALLBACK');
  window.location.href = `${ROOT_URL}/login`;
};
/**
 * A function for fetching all items loaded into backend (or a given number based on backend parameters)
 */
export function fetchSubmissions() {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_ITEMS,
    {
      method: 'get',
      url: `${ROOT_URL}/items/submissions`,
      withCredentials: true
    }, { failureCallback: redirect }
  );
}
// New item (AUTH)
export function createItem(newItem) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_ITEM,
    {
      method: 'post',
      url: `${ROOT_URL}/items`,
      data: newItem,
      withCredentials: true
    },
  );
}

// // TODO: Add additional auth to call this
// // Delete all items (AUTH)
// export function deleteAllItems() {
//   return dispatch => new Promise((resolve, reject) => {
//     axios.delete(`${ROOT_URL}/items`, { timeout: requestTimeout }).then((response) => {
//       resolve();
//     }).catch((error) => {
//       reject();
//     });
//   });
// }

// :id

// Get
export function fetchItemByID(id, successCallback) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_ITEM,
    {
      method: 'get',
      url: `${ROOT_URL}/items/${id}`,
    }, { successCallback }
  );
}

// Update (AUTH)
export function updateItemByID(id, update, successCallback) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_ITEM,
    {
      method: 'put',
      url: `${ROOT_URL}/items/${id}`,
      data: update,
      withCredentials: true
    }, { successCallback }
  );
}

// Delete (AUTH)
export function deleteItemByID(id) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.DELETE_ITEM,
    {
      method: 'delete',
      url: `${ROOT_URL}/items/${id}`,
      withCredentials: true
    },
    {
      additionalPayloadFields: { id },
    },
  );
}
