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
            window.location.href = `${ROOT_URL}/login`;
            return null;
          }}
        />
        <Route
          path="/logout"
          component={() => {
            window.location.href = `${ROOT_URL}/logout`;
            return null;
          }}
        />
        <Route path="/submissions" component={Submissions} />
        <Route path="/items/:itemID" component={Fullview} />
        <Route path="/form/:itemID" component={VoxForm} />
        <Route component={FallBack} />
      </Switch>
    </div>
  </Router>
);

export default connect(null, null)(App);
