import { UserState, UserActions } from 'types/user';

const initialState: UserState = {
  users: {},
  user: null,
  isAuthenticated: false
};

const userReducer = (state = initialState, action: UserActions): UserState => {
  if (action.status !== 'SUCCESS') { return state; }

  switch (action.type) {
    case 'AUTH_USER':
      return { ...state, isAuthenticated: action.payload.data.authenticated, };

    case 'DEAUTH_USER':
      return {
        ...state, isAuthenticated: false, user: null, users: {}
      };

    default:
      return state;
  }
};

export default userReducer;
