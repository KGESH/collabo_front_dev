import React, { useEffect, useState } from 'react';
import 'components/navbar/style/Navbar.css';
import { Link } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { currentUserVar } from 'services/apollo-client/LocalState';
import { ReactComponent as LoginIcon } from 'resources/images/navbar/login.svg';
import HomeIcon from 'resources/images/navbar/home.png';
import MapIcon from 'resources/images/navbar/map.png';

const Navbar = () => {
  const user = useReactiveVar(currentUserVar);
  const [profileImg, setProfileImg] = useState<string | undefined>('');

  useEffect(() => {
    if (user) {
      setProfileImg(user.profile_img);
      console.log(`navbar user : ${user.profile_img}`);
    }
  });

  return (
    <nav className='navbar'>
      {user ? (
        <Link to='/mypage'>
          <div className='nav_item'>
            <img className='nav_img rounded-full' src={profileImg} alt='' />
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
