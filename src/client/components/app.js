import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import requireLogin from '../hocs/requireLogin';

import AdminPanel from '../containers/adminPanel';
import SearchPane from '../containers/search/searchPane';

import Dashboard from '../containers/dashboard';
import VoxForm from '../containers/form';
import { ROOT_URL } from '../constants';
import './app.scss';
import icon from '../../../public/dartmouthIcon.png';

const Welcome = () => (
  <div>
    <Navbar className="nav">
      <Navbar.Brand href="/">
        <img src={icon} alt="icon" />
        VOX DAILY
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/signin">Sign In</Nav.Link>
          <Nav.Link href="/logout">Sign Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <NavLink to="/signin">Sign In</NavLink>
    <br />
    <NavLink to="/dashboard">Dashboard</NavLink>
    <br />
    <NavLink to="/form">Form</NavLink>
    <br />
    <SearchPane />
  </div>
);

const FallBack = () => (
  <div>
    Uh oh... URL Not Found! Please contact the system administrator.
  </div>
);

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Welcome} />
        {/* <Route exact path="/signin" component={SignInPanel} /> */}
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

        <Route path="/admin" component={requireLogin(AdminPanel, Dashboard)} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/form" component={VoxForm} />
        <Route component={FallBack} />
      </Switch>
    </div>
  </Router>
);

export default connect(null, null)(App);
