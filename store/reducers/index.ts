import { combineReducers } from 'redux';

import postReducer from './postReducer';
import requestReducer from './requestReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  post: postReducer,
  request: requestReducer,
  user: userReducer
});

export default rootReducer;
