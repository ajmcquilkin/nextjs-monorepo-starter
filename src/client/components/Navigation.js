/* eslint-disable no-restricted-globals */
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { authenticate } from 'passport';
import ActionTypes from '../actions';
import HeaderLogo from '../../../public/dPineWhite.svg';
import SignOutIcon from '../../../public/signOut.svg';

const Navigation = ({ authenticated, reviewer }) => (
  <header id="app-main-header">
    <div id="app-brand-container">
      <HeaderLogo />
      <h1>VOX DAILY</h1>
    </div>

    <nav id="app-links-container">

      <a href="/" className={location.pathname === '/' ? 'active' : ''}>Home </a>
      <a href="/submissions" className={location.pathname === '/submissions' ? 'active' : ''}>Submissions</a>
      {reviewer && <a href="/review" className={location.pathname === '/review' ? 'active' : ''}>Review</a>}
      {reviewer && <a href="/compile" className={location.pathname === '/compile' ? 'active' : ''}>Compile</a>}

      {/* <NavLink to="/home" className="active">Home</NavLink>
        <NavLink to="/form/new">Submit</NavLink>
        <NavLink to="/submissions">Review</NavLink>
        <NavLink to="">Compile</NavLink> */}
      {authenticated ? <a href="/logout">Log Out</a> : <a href="/signin">Log in</a>}

    </nav>
  </header>

);

const mapStateToProps = (state) => ({

  authenticated: state.auth.authenticated,
  reviewer: state.auth.reviewer

});

export default connect(mapStateToProps, null)(Navigation);
