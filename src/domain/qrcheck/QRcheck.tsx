import React from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/client';
import 'domain/qrcheck/style/QRcheck.css';

const ADD_CARD = gql`
  mutation (
    $id: Int!
    $cafe_name: String!
    $code: String!
    $card_img: String!
  ) {
    saveCardToUser(
      id: $id
      cafe_name: $cafe_name
      code: $code
      card_img: $card_img
    ) {
      id
    }
  }
`;

const GET_USER = gql`
<<<<<<< HEAD
  query (
    $id: Int!
    $cafe_name: String!
  ) {
    getUserById(
      id: $id
    ) {
=======
  query ($id: Int!) {
    getUserById(id: $id) {
      qr_list
>>>>>>> main
      auth
    }
    existCafeNameInUser(
      id: $id
      cafe_name: $cafe_name
    ) {
      cafe_list {
        cafe_name
      }
    }
    getCafeByName(
      cafe_name: $cafe_name
    ) {
      cafe_info {
        cafe_name
        card_img
      }
    }
  }
`;

const QRcheck = () => {

<<<<<<< HEAD
  const params: any = useParams();
  const [addCard] = useMutation(ADD_CARD);
  const { data } = useQuery(GET_USER, {
    variables: {
      id: 11700, /* 배포 시 수정해야 합니다. @@@@@@@@@@@*/
      cafe_name: params.cafeName,
    },
  });

  /** 등록을 요청하는 Mutation */
  // const addCard_to_db = ( {
  //   try {
  //     addCard({
  //       variables: {
  //         id: 11700, /* 배포 시 수정해야 합니다. @@@@@@@@@@@*/
  //         cafe_name: `${params.cafeName}`,
  //         code: `${params.code}`,
  //         card_img: `${data?.getCafeByName?.cafe_info?.card_img}`
  //       },
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  /** 로그인(false) 일 때 => 로그인페이지로 이동 */
  if (false) {
    // 로그인 시 history 사용 !!
    return (<Redirect to='/login' />);
  }

  /** 로그인 상태(true) 일 때 */
  else {

    /** 로그인 한 user 가 "CLIENT" 일 때 */
    if (data?.getUserById?.auth == 'client') {
      /** 이미 동일한 카페의 카드가 db에 있을 때 => 등록 실패  */
      if (data?.existCafeNameInUser !== null) {
        return (
          <div className='error_message'>
            이미 등록되어있는 카드입니다.
          </div>
        );

        /** 동일한 카페의 카드가 db에 없을 때 => 해당하는 카페가 db에 존재하는지 확인 */
      } else {
        /** 해당 카페가 존재한다면 카페 등록 화면으로 전환 */
        if (data?.getCafeByName !== null) {
          return (
            <div className='qr_c_group'>
              <div className='qr_c_card'>
                <img className='qr_c_card_img' src={data?.getCafeByName?.cafe_info?.card_img} alt='' />
              </div>
              <div>{data?.getCafeByName?.cafe_info?.name}</div>
              <div className='qr_btn_box'>
                <Link to='/mypage'>
                  {/*<div id='add_qr' onClick={addCard_to_db}>추가</div>*/}
                </Link>
                <Link to='/mypage'>
                  <div id='cancel_qr'>취소</div>
                </Link>
              </div>
            </div>
          );
        } else {
          /** 존재하지 않는다면 error message를 화면에 출력 */
          return (
            <div className='error_message'>
              유효하지 않은 카드입니다.
            </div>
          );
        }
      }
    }

    /** 로그인 한 user가 "OWNER" 일 때 */
    else if (data?.getUserById?.auth == 'owner' || data?.getUserById?.auth == 'staff') {
=======
  const { loading, data, error } = useQuery(GET_USER, {
    variables: { id: 11700 /* 불러올 아이디 */ },
  });
  error ? console.log(error) : '';

  if (data) {
    // db에 있는 코드를 불러온다.
    cafeNames = data.getUserById.cafe_name;
    codeList = data.getUserById.code_list;

    /** 고객중에서 */
    if (data.getUserById.auth === 'client') {
      /** db에 동일한 카페의 카드가 이미 등록된 상태일때 */
      if (cafeNames.includes(params.cafe)) {
        return <div>이미 등록되어있는 카드입니다.</div>;
      } /** db에 없을 때 => 카드 등록 */ else {
        return <div>카드를 등록합니다.</div>;
        // mutation을 이용해 db -> qr배열에 newQR을 통째로 저장
      }
    } else if (data.getUserById.auth === 'owner') {
      /** 고객이 아닌 점주일때 */
>>>>>>> main
      return (
        /** 매장 전용 "App"으로 이동 */
        <Redirect to={`/적립domain/${params.cafe}/${params.code}`} />
      );
    }

    else {return (<></>);}
  }
<<<<<<< HEAD
=======
  return <></>;
>>>>>>> main
};

export default QRcheck;
