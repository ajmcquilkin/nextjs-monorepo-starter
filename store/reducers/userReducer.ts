import { getReducerSuccessSelector } from 'store/helpers';
import { UserState, UserActionTypes } from 'types/user';

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  users: {}
};

// TODO: Update reducer to support single source of truth

const userReducer = (state = initialState, action): UserState => {
  switch (action.type) {
    case getReducerSuccessSelector<UserActionTypes>(UserActionTypes.AUTH_USER): // Update users if action provides user data
      return { ...state, isAuthenticated: action.payload.data.authenticated, };

    case getReducerSuccessSelector<UserActionTypes>(UserActionTypes.DEAUTH_USER):
      return {
        ...state, isAuthenticated: false, user: null, users: {}
      };

    default:
      return state;
  }
};

export default userReducer;
