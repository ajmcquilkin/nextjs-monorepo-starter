import {
  ActionTypes, Actions, Code, RootState, ThunkResult
} from 'types/state';

export const setError = (
  type: ActionTypes, errorMessage: string
): ThunkResult => (dispatch) => {
  dispatch({
    type,
    status: 'FAILURE',
    payload: { data: {}, message: errorMessage }
  } as Actions);
};

export const clearError = (
  type: ActionTypes
): ThunkResult => (dispatch) => {
  dispatch({
    type,
    status: 'REQUEST',
    payload: { data: {}, message: '' }
  } as Actions);
};

export const createLoadingSelector = (
  watchActionTypes: ActionTypes[]
) => (state: RootState): boolean => watchActionTypes.some((watchActionType) => state.request?.[watchActionType]?.isLoading === true);

export const createErrorSelector = (
  watchActionTypes: ActionTypes[]
) => (state: RootState): string => watchActionTypes.reduce((accum, watchActionType) => {
  const message = state.request?.[watchActionType]?.message;
  return message ? [...accum, message] : accum;
}, [])[0] || '';

export const createErrorCodeSelector = (watchActionTypes: ActionTypes[]) => (state: RootState): Code => watchActionTypes.reduce((accum, watchActionType) => {
  const code = state.request?.[watchActionType]?.code;
  if (code == null || code < 200 || code >= 400) return [...accum, code ?? -1];
  return accum;
}, [])[0];
