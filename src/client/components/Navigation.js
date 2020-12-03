import React from 'react';
import { NavLink } from 'react-router-dom';

import HeaderLogo from '../../../public/dPineWhite.svg';
import SignOutIcon from '../../../public/signOut.svg';

const Navigation = () => (
  <header id="app-main-header">
    <div id="app-brand-container">
      <HeaderLogo />
      <h1>VOX DAILY</h1>
    </div>

    <nav id="app-links-container">
      <NavLink to="/" exact>Home</NavLink>
      <NavLink to="/form/new">Submit</NavLink>
      <NavLink to="/submissions">Review</NavLink>
      <NavLink to="/compile">Compile</NavLink>
    </nav>

    <div id="app-signout-container">
      <SignOutIcon />
      <a href="/signout">Sign Out</a>
    </div>
  </header>
);

export default Navigation;
