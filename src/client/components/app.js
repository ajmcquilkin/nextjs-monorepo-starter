import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import requireLogin from '../hocs/requireLogin';

import Submissions from '../containers/submissions';
import VoxForm from '../containers/form';
import { ROOT_URL } from '../constants';
import './app.scss';
import icon from '../../../public/dartmouthIcon.png';
import Webview from '../containers/webview';
import Fullview from './fullview';

const Navigation = () => (
  <div>
    <Navbar className="nav">
      <Navbar.Brand href="/">
        DARTMOUTH VOX DAILY
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/signin">Sign In</Nav.Link>
          <Nav.Link href="/logout">Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <NavLink to="/signin">Sign In</NavLink>
    <br />
    <NavLink to="/submissions">Submissions</NavLink>
    <br />
    <NavLink to="/form">Form</NavLink>
    <br />
  </div>
);

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
        <Route path="/form" component={VoxForm} />
        <Route component={FallBack} />
      </Switch>
    </div>
  </Router>
);

export default connect(null, null)(App);
