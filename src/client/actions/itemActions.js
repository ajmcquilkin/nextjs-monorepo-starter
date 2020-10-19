import ActionTypes, { createAsyncActionCreator } from '.';
import { ROOT_URL } from '../constants';

/**
 * A function for fetching all items loaded into backend (or a given number based on backend parameters)
 */
export function fetchItems() {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_ITEMS,
    {
      method: 'get',
      url: `${ROOT_URL}/items`,
    },
  );
}

// New item (AUTH)
export function createItem(title, description, value) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_ITEM,
    {
      method: 'post',
      url: `${ROOT_URL}/items`,
      data: { title, description, value },
      // TODO: Add auth
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
export function fetchItemByID(id) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_ITEM,
    {
      method: 'get',
      url: `${ROOT_URL}/items/${id}`,
    },
  );
}

// Update (AUTH)
export function updateItemByID(id, update) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.FETCH_ITEM,
    {
      method: 'put',
      url: `${ROOT_URL}/items/${id}`,
      data: update,
      // TODO: Add auth
    },
  );
}

// Delete (AUTH)
export function deleteItemByID(id) {
  return (dispatch) => createAsyncActionCreator(
    dispatch, ActionTypes.DELETE_ITEM,
    {
      method: 'delete',
      url: `${ROOT_URL}/items/${id}`,
      // TODO: Add auth
    },
    {
      additionalPayloadFields: { id },
    },
  );
}
