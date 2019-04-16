import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav>
        <NavLink className='nav-link' to='/collections'>
          Collections
        </NavLink>
        <NavLink className='nav-link' to='/cards'>
          Cards
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
