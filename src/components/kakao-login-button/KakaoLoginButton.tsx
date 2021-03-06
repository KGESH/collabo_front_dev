import React, { useEffect } from 'react';
import KakaoSdkInit from 'services/kakao/KakaoSdkInit';
import kakao_login_btn from 'resources/images/login/kakao_button.png';

const KakaoLoginButton = () => {
  const redirectUri = `https://api-server-rstrcjinfq-du.a.run.app/auth/kakao/KakaoCallback`;
  const state = 'KakaoAuth';

  return (
    <button
      className='mx-5 my-12'
      onClick={() => {
        window.Kakao.Auth.authorize({
          redirectUri,
          state,
        });
      }}
    >
      <img className='w-full h-full' src={kakao_login_btn} />
    </button>
  );
};

export default KakaoLoginButton;
