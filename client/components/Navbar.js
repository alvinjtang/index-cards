import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav>
        <NavLink to='/collections'>Collections</NavLink>
        <NavLink to='/cards'>Cards</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
