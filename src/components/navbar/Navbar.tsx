import React from 'react';
import 'components/navbar/style/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='nav_group'>
      <div className='nav_box'>
        <img src='nav/sign-in-alt-solid.svg' alt='' className='nav_img' />
        <i className='fas fa-home'></i>
      </div>
      <div className='nav_box'>
        <img src='nav/map-marked-alt-solid.svg' alt='' className='nav_img' />
      </div>
      <div className='nav_box'>
        <Link to='/map'>
          <img src='nav/map-marked-alt-solid.svg' alt='' className='nav_img' />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
