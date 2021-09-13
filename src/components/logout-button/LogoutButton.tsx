import React from 'react';
import { useHistory } from 'react-router-dom';
import { isLoggedInVar } from 'services/apollo-client/LocalState';

const LogoutButton = () => {
  const history = useHistory();

  return (
    <button
      type='button'
      className='logout_button'
      onClick={() => {
        console.log(`call logout`);
        localStorage.removeItem('jwt');
        isLoggedInVar(false);
        /** 새로고침 or 특정 페이지로 보내기
         * (21-8-16:지성현)
         */
        history.go(0);
      }}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
