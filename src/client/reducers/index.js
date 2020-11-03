// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import ItemReducer from './item-reducer';
import RequestReducer from './request-reducer';

const rootReducer = combineReducers({
  item: ItemReducer,
  request: RequestReducer,
});

export default rootReducer;
