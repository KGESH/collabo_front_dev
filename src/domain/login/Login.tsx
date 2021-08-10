import React from 'react';
import type { HomeProps } from 'types/Props';
import LoginForm from 'components/login-form/LoginForm';
import 'domain/login/style/Login.css';
import KakaoLoginButton from 'components/kakao-login-button/KakaoLoginButton';

const Login = ({ isLoggedIn }: HomeProps) => (
  <div className='login'>
    <h1 className='login__title'>로그인</h1>
    <div className='login__container'>
      <LoginForm />
      <KakaoLoginButton />
    </div>
  </div>
);

export default Login;
