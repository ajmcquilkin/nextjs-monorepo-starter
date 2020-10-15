// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import ResourceReducer from './resource-reducer';
import RequestReducer from './request-reducer';

const rootReducer = combineReducers({
  resource: ResourceReducer,
  request: RequestReducer,
});

export default rootReducer;
