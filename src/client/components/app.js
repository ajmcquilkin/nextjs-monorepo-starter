import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import { signInUser, signOutUser } from '../actions/authActions';

import requireLogin from '../hocs/requireLogin';

import AdminPanel from '../containers/adminPanel';
import SearchPane from '../containers/search/searchPane';
import SignUpPanel from '../containers/authentication/signUpPanel';
import SignInPanel from '../containers/authentication/signInPanel';
import SignOutPanel from '../containers/authentication/signOutPanel';

import Dashboard from '../containers/dashboard';
import VoxForm from '../containers/form';
import { ROOT_URL } from '../constants';

const Welcome = (props) => (
  <div>
    <Navbar bg="light">
      <Navbar.Brand href="/">Vox</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/signin">Sign In</Nav.Link>
          <Nav.Link href="/signup">Sign Up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <NavLink to="/signin">Sign In</NavLink>
    <br />
    <NavLink to="/signup">Sign Up</NavLink>
    <br />
    <NavLink to="/dashboard">Dashboard</NavLink>
    <br />
    <NavLink to="/form">Form</NavLink>
    <br />
    <SearchPane />
  </div>
);

const FallBack = (props) => <div>Uh oh... URL Not Found! Please contact the system administrator.</div>;

const App = (props) => (
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

        <Route exact path="/signup" component={SignUpPanel} />
        <Route exact path="/signout" component={SignOutPanel} />
        <Route path="/admin" component={requireLogin(AdminPanel, SignInPanel)} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/form" component={VoxForm} />
        <Route component={FallBack} />
        <Route component={FallBack} />
      </Switch>
    </div>
  </Router>
);

export default connect(null, { signInUser, signOutUser })(App);
