import type { IMenuList } from 'types/Routes';
/**
 * menu 리스트를 등록할 때 사용
 */

const Menu_list: IMenuList[] = [
  {
    path: '/',
    label: '홈페이지',
  },
  {
    path: '/Login',
    label: '로그인',
  },
  {
    path: '/EmailSignUp',
    label: '회원가입',
  },
  {
    path: '/MyPage',
    label: '마이페이지',
  },
  {
    path: '/CafeTour',
    label: '카페투어',
  },
  {
    path: '/qrcheck/:cafe/:code',
    label: '카페 등록',
  },
];

export default Menu_list;
