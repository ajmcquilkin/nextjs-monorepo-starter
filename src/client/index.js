import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/app';

import ActionTypes from './actions';
import reducers from './reducers';
import { authTokenName } from './constants';
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
/* eslint-disable no-underscore-dangle */
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

// Check if auth token is present in browser
let localStorageEnabled = true;
const getTokenFromLocalStorage = () => new Promise((resolve) => {
  resolve(localStorage.getItem(authTokenName));
});

getTokenFromLocalStorage().then((authToken) => {
  if (authToken) {
    // Check if authorized in actions
    store.dispatch({ type: ActionTypes.AUTH_USER_SUCCESS, payload: {} });
  } else {
    // No authorization
    store.dispatch({ type: ActionTypes.DEAUTH_USER_SUCCESS });
  }
}).catch((error) => {
  console.error(error);
  // Use this to alert the user attempting to log in to site
  localStorageEnabled = false;
  console.log('local storage enabled:', localStorageEnabled);
});

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);