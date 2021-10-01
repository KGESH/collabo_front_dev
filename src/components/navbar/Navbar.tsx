import React from 'react';
import 'components/navbar/style/Navbar.css';
import { Link } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { currentUserVar } from 'services/apollo-client/LocalState';
import { ReactComponent as LoginIcon } from 'resources/images/navbar/login.svg';
import MockUserIcon from 'resources/images/navbar/mock_user.gif';
import HomeIcon from 'resources/images/navbar/home.png';
import MapIcon from 'resources/images/navbar/map.png';

/**
 * need user profile img
 */
const Navbar = () => {
  const user = useReactiveVar(currentUserVar);

  return (
    <nav className='navbar'>
      {user ? (
        <Link to='/mypage'>
          <div className='nav_item'>
            <img className='nav_img rounded-full' src={MockUserIcon} alt='' />
          </div>
        </Link>
      ) : (
        <Link to='/login'>
          <LoginIcon className='nav_item border border-gray-500 rounded-full' />
        </Link>
      )}

      <Link to='/'>
        <div className='nav_item'>
          <img src={HomeIcon} alt='' className='nav_img' />
        </div>
      </Link>

      <Link to='/map/user/0'>
        <div className='nav_item'>
          <img src={MapIcon} alt='' className='nav_img' />
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
