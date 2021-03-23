import { combineReducers } from 'redux';
import { RootState } from 'types/state';

import announcementReducer from 'store/reducers/announcementReducer';
import modalReducer from 'store/reducers/modalReducer';
import requestReducer from 'store/reducers/requestReducer';
import resourceReducer from 'store/reducers/resourceReducer';
import userReducer from 'store/reducers/userReducer';

const rootReducer = combineReducers<RootState>({
  announcement: announcementReducer,
  modal: modalReducer,
  request: requestReducer,
  resource: resourceReducer,
  user: userReducer,
});

export default rootReducer;
