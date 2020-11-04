import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import { Button, Nav, Navbar } from 'react-bootstrap';
import withLoading from '../hocs/withLoading';
// import requireLogin from '../hocs/requireLogin';

import Submissions from '../containers/submissions';
import VoxForm from '../containers/form';
import { ROOT_URL } from '../constants';
import '../styles/app.scss';
// import icon from '../../../public/dartmouthIcon.png';
import Webview from '../containers/webview';
import Fullview from './fullview';
import {
  checkUser
} from '../actions/authActions';
import ActionTypes from '../actions';

const Navigation = () => (
  <div>
    <Navbar className="nav">
      <Navbar.Brand href="/">
        DARTMOUTH VOX DAILY
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/submissions">Dashboard</Nav.Link>
          <Nav.Link href="/form/new">Submit</Nav.Link>
          <Nav.Link href="/signin">Sign In</Nav.Link>
          <Nav.Link href="/logout">Sign Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

const FallBack = () => (
  <div>
    URL Not Found
  </div>
);

const App = (props) => (
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
        <Route path="/items/:itemID" component={Fullview} />
        <Route path="/form/:itemID" component={VoxForm} />
        <Route component={FallBack} />
      </Switch>
    </div>
  </Router>
);

export default withLoading(connect(null, {
  checkUser
})(App), [ActionTypes.AUTH_USER]);
