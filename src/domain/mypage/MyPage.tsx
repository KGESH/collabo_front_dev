import React, { useEffect, useRef, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import 'domain/mypage/style/MyPage.css';
import Navbar from 'components/navbar/Navbar';
import QRCode from 'qrcode.react';
import Header from 'components/header/Header';
import { useReactiveVar } from '@apollo/client';
import { currentUserVar, currentJwtVar } from 'services/apollo-client/LocalState';
import RoasteryCard from 'resources/images/mypage/roastery_card.png';
import MockCard1 from 'resources/images/mypage/card1.png';
import MockCard2 from 'resources/images/mypage/card2.png';
import MockCard3 from 'resources/images/mypage/card3.png';
import { useScroll } from 'hooks/useScroll';
import styled from 'styled-components';

const GET_USER = gql`
  mutation GET_KAKAO_USER_BY_JWT($jwt: String!) {
    getKakaoUserByJwt(jwt: $jwt) {
      user {
        cafe_list {
          cafe_name
          code
          card_img
        }
      }
      jwt
    }
  }
`;

const MyPage = () => {
  const user = useReactiveVar(currentUserVar);
  const jwt = useReactiveVar(currentJwtVar);
  const [getUser, { loading, data, error }] = useMutation(GET_USER);
  const cardClick = (index: number) => {
    document.getElementsByClassName('my_qr_box')[index].classList.toggle('hidden');
  };
  const { scrollTop, ref } = useScroll();

  useEffect(() => {
    if (jwt) {
      getUser({ variables: { jwt } });
    }
  }, [jwt]);

  return (
    <>
      <div className='flex flex-col items-center'>
        <Header menu={true} />
        <div>
          <div className='my_point_group'>
            <em>
              <strong className='text-5xl font-serif'>{user?.point}</strong>
            </em>
          </div>
        </div>
        <div
          ref={ref}
          className='boxes grid grid-cols-1 grid-rows-5 relative overflow-y-scroll  bg-gray-500'
        >
          <img className='box w-full relative' src={MockCard1} />
          <img className='box w-full relative' src={MockCard2} />
          <img className='box z-50 w-full relative' src={MockCard3} />
          <img className='box z-30 w-full  relative' src={MockCard1} />
          <img className='box z-20  w-full relative' src={MockCard2} />
        </div>
      </div>
      {/* <div className='bg-green-200 w-full relative'>
        <img className='w-full h-full' src={RoasteryCard} />
      </div> */}
      <Navbar />
    </>
  );
};

export default MyPage;
