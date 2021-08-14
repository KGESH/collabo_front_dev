import React from 'react';
import 'components/menu/style/Menu.css';

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
            <div className='menu__sign_in'>로그인</div>
            <div className='menu__sign_up'>회원가입</div>
          </div>
          <div className='menu__content'>
            <div className='menu__p'>마이페이지</div>
            <div className='menu__p'>마이페이지</div>
            <div className='menu__p'>마이페이지</div>
            <div className='menu__p'>마이페이지</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;