import React from 'react';
import type { HomeProps } from 'types/Props';
import LoginForm from 'components/login-form/LoginForm';
import 'domain/login/style/Login.css';

const Login = ({ isLoggedIn }: HomeProps) => (
  <div className='login'>
    <h1 className='login__title'>로그인</h1>
    <div className='login__container'>
      <LoginForm />
    </div>
  </div>
);

export default Login;
