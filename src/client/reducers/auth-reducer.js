import ActionTypes from '../actions';

const initialState = {
  authenticated: false,
  user: {},
  reviewer: false,
  netid: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.AUTH_USER}_SUCCESS`: // Update users if action provides user data
      return {
        ...state,
        authenticated: action.payload.data.authenticated,
        user: action.payload.data ? action.payload.data : state.user,
        reviewer: action.payload.data.reviewer,
        netid: action.payload.data.netid
      };
    case `${ActionTypes.DEAUTH_USER}_SUCCESS`:
      return {
        ...state, authenticated: false, users: {}, reviewer: false
      };
    default:
      return state;
  }
};

export default reducer;
