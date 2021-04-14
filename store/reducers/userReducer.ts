import { Actions } from 'types/state';
import { UserState } from 'types/user';

const initialState: UserState = {
  name: '',
  netId: null,

  hasAttemptedAuth: false,
  isAuthenticated: false,
  isStaff: false,
  isReviewer: false
};

const userReducer = (state = initialState, action: Actions): UserState => {
  switch (action.type) {
    case 'AUTH_USER_SUCCESS':
      return {
        ...state,
        name: action.payload.data.name,
        netId: action.payload.data.netId,

        hasAttemptedAuth: true,
        isAuthenticated: action.payload.data.isAuthenticated,
        isStaff: action.payload.data.isStaff,
        isReviewer: action.payload.data.isReviewer
      };

    case 'DEAUTH_USER':
      return {
        ...state,
        name: '',
        netId: null,

        hasAttemptedAuth: false,
        isAuthenticated: false,
        isStaff: false,
        isReviewer: false
      };

    default:
      return state;
  }
};

export default userReducer;
