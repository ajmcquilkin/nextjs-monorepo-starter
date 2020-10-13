import axios from 'axios';
import { ROOT_URL } from '../constants';
import ActionTypes from './index';

/**
 * A function for fetching all items loaded
 * into backend (or a given number based on backend parameters)
 */
export function fetchResources() {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.FETCH_ITEMS_REQUEST });

    axios.get(`${ROOT_URL}/items`, { withCredentials: true }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_ITEMS_SUCCESS, payload: response.data });
      resolve();
    }).catch((error) => {
      dispatch({ type: ActionTypes.FETCH_ITEMS_FAILURE, payload: error.response.data });
      reject(error);
    });
  });
}

// New item (AUTH)
export function createResource(title, description, value) {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.FETCH_ITEM_REQUEST });

    axios.post(`${ROOT_URL}/items`, { title, description, value }, { withCredentials: true }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_ITEM_SUCCESS, payload: response.data });
      resolve();
    }).catch((error) => {
      dispatch({ type: ActionTypes.FETCH_ITEM_FAILURE, payload: error.response.data });
      reject(error);
    });
  });
}

// // TODO: Add additional auth to call this
// // Delete all items (AUTH)
// export function deleteAllResources() {
//   return dispatch => new Promise((resolve, reject) => {
//     axios.delete(`${ROOT_URL}/items`).then((response) => {
//       resolve();
//     }).catch((error) => {
//       reject(error);
//     });
//   });
// }

// :id

// Get
export function fetchResourceByID(id) {
  return (dispatch) => new Promise((resolve, reject) => {
    if (!id) {
      dispatch({ type: ActionTypes.FETCH_ITEM_SUCCESS, payload: {} });
      resolve();
    } else {
      dispatch({ type: ActionTypes.FETCH_ITEM_REQUEST });

      axios.get(`${ROOT_URL}/items/${id}`, { withCredentials: true }).then((response) => {
        dispatch({ type: ActionTypes.FETCH_ITEM_SUCCESS, payload: response.data });
        resolve();
      }).catch((error) => {
        dispatch({ type: ActionTypes.FETCH_ITEM_FAILURE, payload: error.response.data });
        reject(error);
      });
    }
  });
}

// Update (AUTH)
export function updateResourceByID(id, update) {
  return (dispatch) => new Promise((resolve, reject) => {
    dispatch({ type: ActionTypes.FETCH_ITEM_REQUEST });

    axios.put(`${ROOT_URL}/items/${id}`, update, { withCredentials: true }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_ITEM_SUCCESS, payload: response.data });
      resolve();
    }).catch((error) => {
      dispatch({ type: ActionTypes.FETCH_ITEM_FAILURE, payload: error.response.data });
      reject(error);
    });
  });
}

// Delete (AUTH)
export function deleteResourceByID(id) {
  return (dispatch) => new Promise((resolve, reject) => {
    axios.delete(`${ROOT_URL}/items/${id}`, { withCredentials: true }).then((response) => {
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}
