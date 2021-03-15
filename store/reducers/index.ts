import { combineReducers } from 'redux';
import { RootState } from 'types/state';

import announcementReducer from 'store/reducers/announcementReducer';
import modalReducer from 'store/reducers/modalReducer';
import postReducer from 'store/reducers/postReducer';
import releaseReducer from 'store/reducers/releaseReducer';
import requestReducer from 'store/reducers/requestReducer';
import userReducer from 'store/reducers/userReducer';

const rootReducer = combineReducers<RootState>({
  announcement: announcementReducer,
  modal: modalReducer,
  post: postReducer,
  release: releaseReducer,
  request: requestReducer,
  user: userReducer,
});

export default rootReducer;
