import React from 'react';
import { useParams } from 'react-router-dom';

export default () => {


  // 판매자 권한이 있으면 -> 포인트 적립 링크로 이동
  // 고객 권한이 있으면 -> 카드 등록(mutation)
  const data:any = useParams();
  console.log(`카페이름:${data.cafe}  코드이름:${data.code}`);
 /* if (auth === 고객){
    if (cafe의 카드를 이미 등록했다면){
      throw error;
    } else {
      (mutation으로 collection"users.qr_list" 에 http://localhost/3000/:카페이름/:코드 를 통째로 저장)
    }
  } else if (auth === 점주, 판매자) {
    현재 유저정보를 뽑아서 포인트 적립 화면으로 이동
  }*/

  return (
    <></>
  );
}