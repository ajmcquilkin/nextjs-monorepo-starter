import { combineReducers } from 'redux';
import { RootState } from 'types/state';

import postReducer from './postReducer';
import releaseReducer from './releaseReducer';
import requestReducer from './requestReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers<RootState>({
  post: postReducer,
  release: releaseReducer,
  request: requestReducer,
  user: userReducer,
});

export default rootReducer;
