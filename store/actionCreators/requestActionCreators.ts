import { Action, Dispatch } from 'redux';
import { RequestState } from 'types/request';

// TODO: Update types for this file

export const setError = (action: Action, errorMessage: string) => (dispatch: Dispatch): Action => dispatch({ type: `${action}_FAILURE`, payload: { message: errorMessage } });
export const clearError = (action: Action) => (dispatch: Dispatch): Action => dispatch({ type: `${action}_CLEAR_ERR`, payload: { message: '' } });

export const createLoadingSelector = (actions: string[]) => (state: { request: RequestState }): boolean => actions.some((action) => state.request?.[action]?.isLoading === true);

export const createErrorSelector = (actions: string[]) => (state: { request: RequestState }): string => actions.reduce((accum, action) => {
  const message = state.request?.[action]?.message;
  return message ? [...accum, message] : accum;
}, [])[0] || '';

export const createErrorCodeSelector = (actions: string[]) => (state: { request: RequestState }): number => actions.reduce((accum, action) => {
  const code = state.request?.[action]?.code;
  if (code < 200 || code >= 400) return [...accum, code];
  return accum;
}, [])[0];
