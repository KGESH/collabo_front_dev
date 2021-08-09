import React, { useEffect } from 'react';
import KakaoSdkInit from 'services/kakao/KakaoSdkInit';

const KakaoLoginButton = () => {
  const redirectUri = `http://localhost:4010/auth/kakao/KakaoCallback`;
  const state = 'KakaoAuth';

  useEffect(() => {
    KakaoSdkInit();
  }, []);
  return (
    <button
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
