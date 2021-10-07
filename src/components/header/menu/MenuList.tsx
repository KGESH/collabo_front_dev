import type { IMenuList } from 'types/Routes';
/**
 * menu 리스트를 등록할 때 사용
 */

const Menu_list: IMenuList[] = [
  {
    path: '/EditProfile',
    label: '프로필 편집',
  },
  {
    path: '/mypage',
    label: '설정',
  },
];

export default Menu_list;
