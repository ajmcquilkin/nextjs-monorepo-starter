/**
 * Returns a function that can be added directly to a mapStateToProps object
 * that will determine if any of the passed actions are loading
 */
export const createLoadingSelector = (actions) => (state) => {
  // actions not passed as an array
  if (!Array.isArray(actions)) { return () => false; }

  // Returns true only if all passed actions aren't loading
  return actions.some((action) => state.request?.[action]?.loading === true);
};

/**
 * A function to manually set an error message in the error redux store
 * @param {*} action
 * @param {*} errorMessage
 */
export function setError(action, errorMessage) {
  return (dispatch) => dispatch({ type: `${action}_FAILURE`, payload: { message: errorMessage } });
}

/**
 * A function to manually clear an error from the redux store
 * @param {*} action
 */
export function clearError(action) {
  return (dispatch) => dispatch({ type: `${action}_CLEAR_ERR`, payload: { message: '' } });
}

/**
 * Returns a function that can be added directly to a mapStateToProps object
 * that will return the first error message associated with the array of actions (if any)
 */
export const createErrorSelector = (actions) => (state) => {
  // actions not passed as an array
  if (!Array.isArray(actions)) { return () => ''; }

  // Returns the first found error message
  return actions.reduce((accum, action) => {
    const message = state.request?.[action]?.message;
    if (message) return [...accum, message];
    return accum;
  }, [])[0] || '';
};

/**
 * Returns a function that can be added directly to a mapStateToProps object
 * that will return the first error code associated with the array of actions (if any)
 */
export const createErrorCodeSelector = (actions) => (state) => {
  // actions not passed as an array
  if (!Array.isArray(actions)) { return () => ''; }

  // Returns the first found error message
  return actions.reduce((accum, action) => {
    const code = state.request?.[action]?.code;
    if (code < 200 || code >= 400) return [...accum, code];
    return accum;
  }, []) || [];
};
