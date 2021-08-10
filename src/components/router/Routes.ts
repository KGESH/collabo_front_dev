import type { Routes } from 'types/Routes';
import Home from 'domain/home/Home';
import Login from 'domain/login/Login';
import EmailSignUp from 'domain/email-sign-up/EmailSignUp';
import KakaoCallback from 'domain/login/kakao-callback/KakaoCallback';
import MyPage from 'domain/my-page/MyPage';
import CafeTour from 'domain/cafe-tour/CafeTour';
import QRcheck from 'domain/qrcheck/QRcheck';
import Map from 'domain/map/Map';

/**
 * 새로운 페이지를 라우터에 연결할 때
 * 이곳에 추가
 */

const AppRoutes: Routes[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/Login',
    exact: true,
    component: Login,
  },
  {
    path: '/Login/KakaoCallback/',
    exact: false,
    component: KakaoCallback,
  },
  {
    path: '/EmailSignUp',
    exact: true,
    component: EmailSignUp,
  },
  {
    path: '/MyPage',
    exact: true,
    component: MyPage,
  },
  {
    path: '/CafeTour',
    exact: true,
    component: CafeTour,
  },
  {
    path: '/qrcheck/:cafe/:code',
    exact: true,
    component: QRcheck,
  },
  {
    path: '/map',
    exact: true,
    component: Map,
  }
];

export default AppRoutes;
