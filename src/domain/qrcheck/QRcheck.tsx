import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_USER = gql`
    query($id: Int) {
        user(id: $id) {
            id
            name
            qr
        }
    },
    query($qr: String) {
        user(qr: $qr) {
            id
        }
    }
`;

export default () => {
  const {loading, data, error} = useQuery(GET_USER);
  // 배포 시 포트 번호는 front server에서 받아온다.
  const port = 3000;

  // 판매자 권한이 있으면 -> 포인트 적립 링크로 이동
  // 고객 권한이 있으면 -> 카드 등록(mutation)
  const params: any = useParams();
  console.log(`카페이름:${params.cafe}  코드이름:${params.code}`);
  const newQR = `http://localhost:${port}/:${params.cafe}/:${params.code}`;
  /*if(1) { // 고객
    /!** *!/
    if(qr.includes(newQR)) {
      console.log("이미 등록되어있는 카드입니다.");
    } else {
      console.log("카드를 등록합니다.");
      // mutation을 이용해 db -> qr배열에 newQR을 통째로 저장
    }
  } else if (2) { // 점주
    if(3) {// 사용자 중 newQR을 갖고있는 사용자가 있다면
      // (점주만 접근 가능한)포인트 적립 페이지로 이동
    } else {
      console.log("이 카드는 유효하지 않습니다.");
    }
  }*/
  return (
    <></>
  );
}