import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { client } from 'services/apollo-client/apollo';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import './index.css';
import GetCurrentLocation from 'components/get-current-location/GetCurrentLocation';
import GetHashTag from 'components/get-hash-tag/GetHashTag';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        {/* 개발용 NavBar. 배포 전 제거 (추가 21-08-12:유성현) */}
        {/* <div className='exclusive_use_of_dev'>
          <Link to='/'>홈 </Link>
          <Link to='/login'>로그인 </Link>
          <Link to='/mypage'>마이페이지 </Link>
          <Link to='/cafeTour'>카페투어 </Link>
          <Link to='/Detail/스타벅스'>디테일 </Link>
          <Link to='/map/user/0'>지도 </Link>
          <Link to='/qrcheck/스타벅스/E9OW312GF1Q'>카드추가 </Link>
          <Link to='/map/cafe/142090'>지도TEST</Link>
        </div> */}
        {/* --------------------------------------- */}
        <App />
        <GetCurrentLocation />
        <GetHashTag />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
