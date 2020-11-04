import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import Submissions from '../containers/submissions';
import VoxForm from '../containers/form';

import Webview from '../containers/webview';
import Fullview from './fullview';
import Navigation from './Navigation';
import { ROOT_URL } from '../constants';
import '../styles/app.scss';
import withLoading from '../hocs/withLoading';
import { checkUser } from '../actions/authActions';
import ActionTypes from '../actions';
import Review from '../containers/review';

const FallBack = () => (
  <div>
    URL Not Found
  </div>
);

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Webview} />
        <Route
          path="/signin"
          component={() => {
            window.location.href = `${ROOT_URL}/auth/login`;
            return null;
          }}
        />
        <Route
          path="/logout"
          component={() => {
            window.location.href = `${ROOT_URL}/auth/logout`;
            return null;
          }}
        />
        <Route path="/submissions" component={Submissions} />
        <Route path="/review" component={Review} />
        <Route path="/items/:itemID" component={Fullview} />
        <Route path="/form/:itemID" component={VoxForm} />
        <Route component={FallBack} />
      </Switch>
    </div>
  </Router>
);

export default withLoading(connect(null, { checkUser })(App), [ActionTypes.AUTH_USER]);
