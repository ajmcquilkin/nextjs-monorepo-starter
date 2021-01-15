import { RequestState } from 'types/request';
import { RequestStatus } from '../helpers';

const initialState: RequestState = {};

const requestReducer = (state = initialState, action): RequestState => {
  const matches = new RegExp(`(.*)_(${RequestStatus.request}|${RequestStatus.success}|${RequestStatus.failure}|${RequestStatus.clearError})`).exec(action.type);
  if (!matches) { return state; }

  const [, requestName, requestState] = matches;
  const updatedState: RequestState = { ...state, [requestName]: { isLoading: true } };

  updatedState[requestName].isLoading = requestState === RequestStatus.request;
  updatedState[requestName].message = requestState === RequestStatus.request ? '' : action?.payload?.message || '';
  updatedState[requestName].code = action?.payload?.code || null;

  return updatedState;
};

export default requestReducer;
