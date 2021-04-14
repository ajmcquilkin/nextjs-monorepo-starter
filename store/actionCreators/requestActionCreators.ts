import { RootState, ActionSubTypes, Code } from 'types/state';

export const createLoadingSelector = (
  watchActionTypes: ActionSubTypes[]
) => (state: RootState): boolean => watchActionTypes.some((watchActionType) => state.request?.[watchActionType]?.isLoading === true);

export const createErrorSelector = (
  watchActionTypes: ActionSubTypes[]
) => (state: RootState): string[] => watchActionTypes.reduce((accum, watchActionType) => {
  const message = state.request?.[watchActionType]?.message;
  return message ? [...accum, message] : accum;
}, []);

export const createErrorCodeSelector = (watchActionTypes: ActionSubTypes[]) => (state: RootState): Code[] => watchActionTypes.reduce((accum, watchActionType) => {
  const code = state.request?.[watchActionType]?.code;
  if (code == null || code < 200 || code >= 400) return [...accum, code ?? -1];
  return accum;
}, []);
