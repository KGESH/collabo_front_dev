import React from 'react';
import 'components/navbar/style/Navbar.css';

const Navbar = () => {
  return (
    <div className='nav_group'>
      <div className='nav_box'>
        <img src="nav/sign-in-alt-solid.svg" alt='' className='img' />
      </div>
      <div className='nav_box'>
        <img src='nav/map-marked-alt-solid.svg' alt='' className='img' />
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