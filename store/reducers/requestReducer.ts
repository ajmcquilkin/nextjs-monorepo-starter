import {
  RequestState, Actions,
  REQUEST, SUCCESS, FAILURE, Code
} from 'types/state';

const initialState: RequestState = {};

const requestReducer = (state = initialState, action: Actions): RequestState => {
  const matches = new RegExp(`(.*)_(${REQUEST}|${SUCCESS}|${FAILURE})`).exec(action.type);

  if (!matches) { return state; }
  const [, requestName, requestState] = matches;

  const updatedState: RequestState = {
    ...state,
    [requestName]: {
      isLoading: requestState === REQUEST,
      message: requestState === FAILURE ? (action.payload as { message: string })?.message || 'Unknown Error' : '',
      code: (action.payload as { code: Code })?.code || null
    }
  };

  return updatedState;
};

export default requestReducer;
