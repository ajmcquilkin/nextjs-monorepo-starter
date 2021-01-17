import { Dispatch } from 'redux';
import { Empty } from 'types/generic';
import {
  Action, ActionTypes, Code, RootState
} from 'types/state';

export const setError = (
  type: ActionTypes, errorMessage: string
) => (dispatch: Dispatch): Action<ActionTypes, Empty> => dispatch({
  type,
  status: 'FAILURE',
  payload: { data: {}, message: errorMessage }
});

export const clearError = (
  type: ActionTypes
) => (dispatch: Dispatch): Action<ActionTypes, Empty> => dispatch({
  type,
  status: 'REQUEST',
  payload: { data: {}, message: '' }
});

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
