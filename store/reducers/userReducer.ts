import { Actions } from 'types/state';
import { UserState } from 'types/user';

const initialState: UserState = {
  name: '',
  netId: null,

  isAuthenticated: false,
  isStaff: false,
  isReviewer: false
};

const userReducer = (state = initialState, action: Actions): UserState => {
  if (action.status !== 'SUCCESS') { return state; }

  switch (action.type) {
    case 'AUTH_USER':
      return {
        ...state,
        name: action.payload.data.name,
        netId: action.payload.data.netId,

        isAuthenticated: action.payload.data.isAuthenticated,
        isStaff: action.payload.data.isStaff,
        isReviewer: action.payload.data.isReviewer
      };

    case 'DEAUTH_USER':
      return {
        ...state,
        name: '',
        netId: null,

        isAuthenticated: false,
        isStaff: false,
        isReviewer: false
      };

    default:
      return state;
  }
};

export default userReducer;
