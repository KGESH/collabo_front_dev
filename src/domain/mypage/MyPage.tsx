import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import 'domain/mypage/style/MyPage.css';
import Navbar from 'components/navbar/Navbar';
import QRCode from 'qrcode.react';
import Header from 'components/header/Header';
import { useReactiveVar } from '@apollo/client';
import { isInitVar, currentUserVar } from 'services/apollo-client/LocalState';

const GET_USER = gql`
  mutation GET_KAKAO_USER_BY_JWT($id: Int!) {
    getKakaoUserByJwt(jwt: $id) {
      user {
        cafe_list {
          cafe_name
          code
          card_img
        }
        point
      }
    }
  }
`;

const MyPage = () => {
  const user = useReactiveVar(currentUserVar);

  console.log(user);

  const { loading, data, error } = useQuery(GET_USER, {
    variables: { id: user?.id /* 불러올 아이디 */ },
  });
  const cardClick = (index: number) => {
    document
      .getElementsByClassName('my_qr_box')
      [index].classList.toggle('hidden');
  };

  return (
    <>
      <div className='my_group'>
        <Header menu={true} />
        <div>
          <div className='my_point_group'>
            <em>
              <strong id='point_value'>
                {/* 현재 소지하고 있는 포인트 */}
                {data?.getUserById?.point?.toLocaleString()}
              </strong>
            </em>
          </div>
        </div>
        <div className='my_wallet_group'>
          <div className='my_wallet_inner'>
            {!loading &&
              data &&
              data.getUserById.cafe_list.map((w: any, index: number) => (
                <div
                  className='my_wallet__card'
                  onClick={() => cardClick(index)}
                >
                  <img src={w.card_img} alt='' />
                  <div className='my_qr_box hidden'>
                    <div className='my_qr_code'>
                      {/* user정보에 있는 '카페이름'과 해당 카페의 'Code'를 가져와서 아래 링크로 가는 QR코드를 생성한다. */}
                      <QRCode
                        value={`localhost:3000/qrcheck/${w.cafe_name}/${w.code}`}
                        size={100}
                        level={'L'}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Navbar />
    </>
  );
};

export default MyPage;
