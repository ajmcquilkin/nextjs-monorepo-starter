import axios from 'axios';
import { requestTimeout } from '../constants';

/**
 * All necessary action types for updating redux state with CRUD actions
 *
 * * Create: FETCH_TYPE
 * * Read: FETCH_TYPE or FETCH_TYPES
 * * Update: FETCH_TYPE
 * * Delete: DELETE_TYPE
 */
const ActionTypes = {
  SEARCH: 'SEARCH',

  FETCH_ITEM: 'FETCH_ITEM',
  FETCH_ITEMS: 'FETCH_ITEMS',
  DELETE_ITEM: 'DELETE_ITEM',

  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
};

/**
 * All states an ongoing request can be in
 *
 * * Request: Request has been sent but no response has been received
 * * Success: Request has come back with a 2xx or 3xx status code
 * * Failure: Request has timed out or come back with a 4xx or 5xx status code
 * ? Clear Error: Internal usage type for clearing stored errors from actions in requestReducer
 */
export const requestStates = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  CLEAR_ERR: 'CLEAR_ERR',
};

/**
* Generates valid "success" payload given a response object and additional custom parameters
* * Note: Use this whenever not using `createAsyncActionCreator` to correctly interface with reducers
* @param {*} response - Axios Response
* @param {*} customParams - Any additional parameters to inject into action.payload
* @param {*} subField - A subfield of `response.data` to send as the `data` field of the payload
*/
export function generateSuccessPayload(response, customParams = {}, subField = '') {
  return ({ data: subField ? response.data[subField] : response.data, code: response.status, ...customParams });
}

/**
 * Generates valid "failure" payload given an error object and additional custom parameters
 * * Note: Use this whenever not using `createAsyncActionCreator` to correctly interface with reducers
 * @param {*} error - Javascript error object
 * @param {*} customParams - Any additional parameters to inject into action.payload
 */
export function generateFailurePayload(error, customParams = {}) {
  return ({ message: error.response?.data?.message || error.message || 'No message found', code: error.response?.status || error.code || null, ...customParams });
}

/**
 * A function which standardizes the creation of asynchronous action creators. This allows for standardization in the creation and maintenance of reducers.
 * * Note: This function is intended to reduce boilerplate code. If additional customization is needed, see `generateSuccessPayload` and `generateFailurePayload`
 * @param {*} dispatch - Redux dispatch function
 * @param {*} actionName - Name of action to manage (e.g. ActionTypes.FETCH_USER)
 * @param {*} axiosConfig - Standard axios configuration object (https://github.com/axios/axios#request-config)
 * @param {*} config - Config object containing additional configuration fields
 *
 * Optional `config` fields:
 * * `successCallback` - Function called on success of request (passed request object)
 * * `failureCallback` - Function called on failure of request (passed error object)
 * * `additionalPayloadFields` - Additional fields to include on top level of success action payload (e.g. object id for deleting item)
 * * `responseSubfield` - Loads `response.data[subfield]` into success payload instead of `response.data`
 */
export async function createAsyncActionCreator(dispatch, actionName, axiosConfig, config = {}) {
  try {
    dispatch({ type: `${actionName}_${requestStates.REQUEST}` });
    const response = await axios({ ...axiosConfig, timeout: requestTimeout });
    dispatch({ type: `${actionName}_${requestStates.SUCCESS}`, payload: generateSuccessPayload(response, config?.additionalPayloadFields || {}, config?.responseSubfield || '') });
    if (config.successCallback) { config.successCallback(response); }
  } catch (error) {
    dispatch({ type: `${actionName}_${requestStates.FAILURE}`, payload: generateFailurePayload(error) });
    if (config.failureCallback) { config.failureCallback(error); }
  }
}

export default ActionTypes;
