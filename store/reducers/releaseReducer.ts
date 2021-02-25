import { ReleaseState } from 'types/release';
import { Actions } from 'types/state';

const initialState: ReleaseState = {
  release: null
};

const releaseReducer = (state = initialState, action: Actions): ReleaseState => {
  if (action.status !== 'SUCCESS') { return state; }

  switch (action.type) {
    case 'FETCH_RELEASE':
      return {
        ...state,
        // ?? Maybe change the structure of release state so its not a record
        release: action.payload.data.release
      };
    case 'DELETE_RELEASE':
      return {
        ...state,
        release: null
      };

    default:
      return state;
  }
};

export default releaseReducer;
