import { RootState, ActionTypes, Code } from 'types/state';

export const createLoadingSelector = (
  watchActionTypes: ActionTypes[]
) => (state: RootState): boolean => watchActionTypes.some((watchActionType) => state.request?.[watchActionType]?.isLoading === true);

export const createErrorSelector = (
  watchActionTypes: ActionTypes[]
) => (state: RootState): string[] => watchActionTypes.reduce((accum, watchActionType) => {
  const message = state.request?.[watchActionType]?.message;
  return message ? [...accum, message] : accum;
}, []);

export const createErrorCodeSelector = (watchActionTypes: ActionTypes[]) => (state: RootState): Code[] => watchActionTypes.reduce((accum, watchActionType) => {
  const code = state.request?.[watchActionType]?.code;
  if (code == null || code < 200 || code >= 400) return [...accum, code ?? -1];
  return accum;
}, []);
