import { combineReducers } from 'redux';
import { RootState } from 'types/state';

import postReducer from './postReducer';
import requestReducer from './requestReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers<RootState>({
  post: postReducer,
  request: requestReducer,
  user: userReducer
});

export default rootReducer;
