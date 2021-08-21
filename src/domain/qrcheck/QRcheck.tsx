import React, { useEffect, useState } from 'react';
import { useParams, Redirect, Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import 'domain/qrcheck/style/QRcheck.css';

const add_QR = gql`
  mutation (
    $cafeName: String!
    $code: String!
  ) {
    addQR(
      cafeName: $cafeName
      code: $code
    ) {
      code
    }
  }
`;

const QRcheck = () => {

  const params: any = useParams();
  const [addQR] = useMutation(add_QR);

  const addQR_to_db = () => {
    try {
      addQR({
        variables: {
          cafeName: `${params.cafeName}`,
          code: `${params.code}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
    return (<Redirect to='/' />);
  };

  /** 로그인(false) 일 때 => 로그인페이지로 이동 */
  if (false) {
    return (<Redirect to='/login' />);
  }

  /** 로그인(true) 일 때 */
  else {
    // 현재 User 에 저장된 카페 목록들을 받아온다.

    /** 로그인 한 user 가 "CLIENT" 일 때 */
    if (true/*data.getUserById.auth === ('client')*/) {

      /** 이미 동일한 카페의 카드가 db에 있을 때 => 등록 실패 */
      if (false/*cafeNames.includes(params.cafe)*/) {
        return (
          <div className='qr_c_group'>
            이미 등록되어있는 카드입니다.
          </div>
        );

        /** 동일한 카페의 카드가 db에 없을 때 => 등록 성공 */
      } else {
        return (
          <div className='qr_c_group'>
            카드에 있는 qr링크를 통해서 들어왔을 때 화면입니다.
            <div className='qr_c_card'>
              <img className='qr_c_card_img' src='/detail/st_card.png' alt='' />
            </div>
            <div className='qr_btn_box'>
              <Link to='/mypage'>
                <div id='add_qr' onClick={addQR_to_db}>추가</div>
              </Link>
              <Link to='/mypage'>
                <div id='cancel_qr'>취소</div>
              </Link>
            </div>
          </div>
        );
      }
    }

    /** 로그인 한 user가 "OWNER" 일 때 */
    else if (false/*data.getUserById.auth === 'owner'*/) {
      return (
        /** 매장 전용 "App"으로 이동 */
        <Redirect to={`/적립domain/${params.cafe}/${params.code}`} />
      );
    }
  }
};

export default QRcheck;