import React from 'react';
import 'domain/login/style/Login.css';
import KakaoLoginButton from 'components/kakao-login-button/KakaoLoginButton';
import Navbar from 'components/navbar/Navbar';

const Login = () => {
  return (
    <>
      <section className='login_page'>
        <h1 className='login_logo'>Ca</h1>
        <p className='login_title'>로그인 및 회원가입을</p>
        <p className='login_sub_title'>시작합니다.</p>

        <KakaoLoginButton />
      </section>
      <Navbar />
    </>
  );
};

export default Login;
