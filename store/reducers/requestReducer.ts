import {
  RequestState, Action,
} from 'types/state';

const initialState: RequestState = {};

const requestReducer = (state = initialState, action: Action<string, any>): RequestState => {
  const { type, status } = action;
  if (!status) return state;

  const updatedState: RequestState = { ...state, [type]: { isLoading: true, message: '', code: null } };

  updatedState[type].isLoading = status === 'REQUEST';
  updatedState[type].message = status === 'REQUEST' ? '' : action.payload.message || '';
  updatedState[type].code = action?.payload?.code || null;

  return updatedState;
};

export default requestReducer;
