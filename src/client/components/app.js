import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, NavLink, Switch, withRouter,
} from 'react-router-dom';

import Submissions from '../containers/submissions';
import VoxForm from '../containers/form';

import Webview from '../containers/webview';
import Fullview from './fullview';
import Navigation from './Navigation';
import { ROOT_URL } from '../constants';

// import { ReactComponent as SignOutIcon } from '../../../public/signOut.svg';
// import { ReactComponent as VoxTreeIcon } from '../../../public/voxTree.svg';

import '../styles/app.scss';

// const Navigation = () => (
//   <div>
//     <Navbar className="nav">
//       <Navbar.Brand href="/">
//         DARTMOUTH VOX DAILY
//       </Navbar.Brand>
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="ml-auto">
//           <Nav.Link href="/submissions">Dashboard</Nav.Link>
//           <Nav.Link href="/form/new">Submit</Nav.Link>
//           <Nav.Link href="/signin">Sign In</Nav.Link>
//           <Nav.Link href="/logout">Sign Out</Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   </div>
// );

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
