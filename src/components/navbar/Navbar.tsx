import React from 'react';
import 'components/navbar/style/Navbar.css';
import { Link } from 'react-router-dom';

/**
 * need user profile img
 */
const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/mypage'>
        <div className='nav_item'>
          <img
            className='nav_img rounded-full'
            src='https://ww.namu.la/s/b39cd616b1d08bd30a1c70a540f5be19bd03c64df162d0e6030ec9611196a1b3afff3af84e1d56c65ff7ad6a686578a893aedb785886957028b63d16b1dcc9fd4f07df5c0e8ffb0651a5102ff6d04ef866356e65859c2d324bf17342156e18b8187ca517f6142659af0d2aba2e4d73cb'
            alt=''
          />
        </div>
      </Link>

      <Link to='/'>
        <div className='nav_item'>
          <img src='nav/home.png' alt='' className='nav_img' />
        </div>
      </Link>

      <Link to='/map/user/0'>
        <div className='nav_item'>
          <img src='nav/map.png' alt='' className='nav_img' />
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
