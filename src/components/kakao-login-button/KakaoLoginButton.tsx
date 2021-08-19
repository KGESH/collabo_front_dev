import React from 'react';

const KakaoLoginButton = () => {
  const redirectUri = `http://localhost:4010/auth/kakao/KakaoCallback`;
  const state = 'KakaoAuth';

  return (
    <button
      type='button'
      className='kakao__login_button'
      onClick={() => {
        window.Kakao.Auth.authorize({
          redirectUri,
          state,
        });
      }}
    >
      카카오로 로그인
    </button>
  );
};

export default KakaoLoginButton;
