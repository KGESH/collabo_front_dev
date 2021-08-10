import React from 'react';
import { Link } from 'react-router-dom';
import 'components/navbar/style/Navbar.css';

const Navbar = () => {
  return (
    <div className='nav_group'>
      <div className='nav_box'>
        <Link to='/'>
          <img src='nav/sign-in-alt-solid.svg' alt='' className='img' />
        </Link>
      </div>
      <div className='nav_box'>
        <Link to='/map'>
          <img src='nav/map-marked-alt-solid.svg' alt='' className='img' />
        </Link>
      </div>
      <div className='nav_box'>
        <img src='nav/money-check-alt-solid.svg' alt='' className='img' />
      </div>
      <div className='nav_box'>
        <img src='nav/user-circle-regular.svg' alt='' className='img' />
      </div>
      <div className='nav_box'>
        <img src='nav/user-circle-regular.svg' alt='' className='img' />
      </div>
    </div>
  );
};

export default Navbar;
