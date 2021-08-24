import React from 'react';
import 'components/header/menu/style/Menu.css';
import Menu_list from 'components/header/menu/MenuList';
import { Link } from 'react-router-dom';

const Menu = () => {

  const trigger = (event: any) => {
    const list: any = document.getElementById('menu_list');
    list.classList.toggle('open');
    event.currentTarget.classList.toggle('active');

  };

  return (
    <>
      <div className='menu_trigger' onClick={trigger}>
        <div className='line1 stick' />
        <div className='line2 stick' />
        <div className='line3 stick' />
      </div>

      <div className='menu_list' id='menu_list'>
        <div className='menu_list_inner'>
          <div className='menu__logo'>collabo</div>
          <div className='menu__member'>
            <Link to='/login'>
              <div className='menu__sign_in'>로그인</div>
            </Link>
            <Link to='/signup'>
              <div className='menu__sign_up'>회원가입</div>
            </Link>
          </div>
          <div className='menu__content'>
            {Menu_list.map(w => (
              <Link to={w.path}>
                <div className='menu__p'>{w.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;