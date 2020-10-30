import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ location }) => {
  console.table(location);
  return (
    <header id="app-main-header">
      <div id="app-brand-container">
        {/* <VoxTreeIcon /> */}
        <p>IMAGE HERE</p>
        <h1>VOX DAILY</h1>
      </div>

      <nav id="app-links-container">
        <a href="/" className="active">Home</a>
        <a href="/form/new">Submit</a>
        <a href="/submissions">Review</a>
        <a href="/">Compile</a>
        {/* <NavLink to="/home" className="active">Home</NavLink>
        <NavLink to="/form/new">Submit</NavLink>
        <NavLink to="/submissions">Review</NavLink>
        <NavLink to="">Compile</NavLink> */}
      </nav>

      <div id="app-signout-container">
        {/* <SignOutIcon /> */}
        <p>IMAGE HERE</p>
        Sign Out
      </div>
    </header>
  );
};

export default Navigation;
