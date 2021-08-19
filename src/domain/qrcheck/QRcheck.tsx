import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_USER = gql`
  query($id: Int!) {
    getUserById(id: $id) {
      qr_list
      auth
      code_list
      cafe_name
    }
  }
`;

const QRcheck = () => {
  // 포트 번호는 배포 시에 front서버의 포트 번호를 받아온다.
  const params: any = useParams();
  let cafeNames: string[] = [];
  let codeList: string[] = [];

  const { loading, data, error } = useQuery(GET_USER, {
    variables: { id: 11700/* 불러올 아이디 */ },
  });
  error ? console.log(error) : '';

  if (data) {
    // db에 있는 코드를 불러온다.
    cafeNames = data.getUserById.cafe_name;
    codeList = data.getUserById.code_list;

    /** 고객중에서 */
    if (data.getUserById.auth === ('client')) {
      /** db에 동일한 카페의 카드가 이미 등록된 상태일때 */
      if (cafeNames.includes(params.cafe)) {
        return (<div>이미 등록되어있는 카드입니다.</div>);
      } else /** db에 없을 때 => 카드 등록 */{
        return (<div>카드를 등록합니다.</div>);
        // mutation을 이용해 db -> qr배열에 newQR을 통째로 저장

      }
    }
    /** 고객이 아닌 점주일때 */
    else if (data.getUserById.auth === 'owner') {
      return (
        /** 포인트를 적립하는 점주 전용 페이지로 이동 (인자 /:카페이름/:카드numbering */
        <Redirect to={`/적립domain/${params.cafe}/${params.code}`} />
      );
    }
  }
  return (<></>);
};

export default QRcheck;