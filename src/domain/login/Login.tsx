import React from 'react';
import LoginForm from 'components/login-form/LoginForm';
import 'domain/login/style/Login.css';
import KakaoLoginButton from 'components/kakao-login-button/KakaoLoginButton';
import { useReactiveVar } from '@apollo/client';
import { currentUserVar } from 'services/apollo-client/LocalState';

const Login = () => {
  const user = useReactiveVar(currentUserVar);

  console.log(user);
  return (
    <div className='login'>
      <h1 className='login__title'>로그인</h1>
      <div className='login__container'>
        <LoginForm />
        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default Login;
