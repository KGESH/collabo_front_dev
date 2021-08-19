import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { client } from 'services/apollo-client/Apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import LogoutButton from 'components/logout-button/LogoutButton';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        {/* 개발용 NavBar. 배포 전 제거 (추가 21-08-12:유성현) */}
        <div className='exclusive_use_of_dev'>
          <Link to='/'>홈</Link>
          <Link to='/login'>로그인</Link>
          <Link to='/mypage'>마이페이지</Link>
          <Link to='/CafeTour'>카페투어</Link>
          <Link to='/Detail/스타벅스'>디테일</Link>
        </div>
        {/* --------------------------------------- */}
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
