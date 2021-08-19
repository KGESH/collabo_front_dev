import React from 'react';
import 'components/header/style/Header.css';
import Menu from 'components/header/menu/Menu';

export default (props:any) => {
  /**
   * 해더 호출하는 방법
   * 햄버거 메뉴가 없는 헤더 호출 => <Header menu={false}/>
   * 햄버거 메뉴가 있는 헤더 호출 => <Header menu={true}/>
   * 카메라(qr코드 스캐너)는 따로 import 해주세요.
   */
  return (
    <>
      <div className='header'>Collabo</div>
      {props.menu ? (<Menu/>) : ""}
    </>
  );
}