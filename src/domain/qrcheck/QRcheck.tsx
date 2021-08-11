import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// qr을 찍으면, 찍은 사용자의 id의 qr_list를 뽑아오는 query
const GET_USER = gql`
    query GETUSER($id: Int) {
        getUserById(id: $id) {
            id
            name
        }
    }
`;

// qr을 찍었고, 아이디가 qr_list를 확인했으면 카드(qr)을 등록하는 mutation
// const POST_QR = gql`
//     mutation POSTQR($id: Int) {
//
//     }
// `;

export default () => {
  const params: any = useParams();

  const { loading, data, error } = useQuery(GET_USER, {
    variables: { id: 11700 /* 로그인 중인 사용자의 ID를 입력 */ },
  });
  loading ? " " : console.log(data);

  // 배포 시 포트 번호는 front server(apollo client)에서 받아온다.
  const port = 3000; // 변경 필요

  // qr_list에 저장될 새로운 QR코드
  const newQR = `http://localhost:${port}/:${params.cafe}/:${params.code}`;
  // 오프라인 카드는 적립만 가능하고, 마일리지 사용은 id정보가 추가된 앱 결제로만 가능하게 한다.

  /** 여기서 암호화 작업을 할지 결정
   *
   *
   * */
  if (loading === false) {
    if (data.getUserById.auth === 'client') { // 고객
      if (data.user.qr_list.includes(newQR)) {
        // 이미 등록되어있는 카드
        console.log('이미 등록되어있는 카드입니다.');
      } else {
        // 등록 https://www.apollographql.com/docs/react/data/mutations/
        console.log('카드를 등록합니다.');
        // return ->Home
      }
    } else if (data.getUserById.auth === '점주') { // 점주
      if (true/*qr을 등록한 사용자가 있으면*/) {
        // 포인트를 적립하는 페이지로 이동
      } else {
        // 유효하지 않는 카드
        console.log('이 카드는 유효하지 않습니다.');
      }
    } else {
      console.log('qr 저장 error');
    }
  }

}
