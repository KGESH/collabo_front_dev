import React from 'react';
import 'components/navbar/style/Navbar.css';
import { Link } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { currentUserVar, isLoggedInVar } from 'services/apollo-client/LocalState';
import { ReactComponent as LoginIcon } from 'resources/images/navbar/login.svg';
import MockUserIcon from 'resources/images/navbar/mock_user.gif';
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
          <img src='nav/home.png' alt='' className='nav_img' />
        </div>
      </Link>

      <Link to='/map'>
        <div className='nav_item'>
          <img src='nav/map.png' alt='' className='nav_img' />
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
