import React, { cloneElement, useEffect, useRef, useState } from 'react';
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
import { useInView } from 'react-intersection-observer';

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
  const viewPort = document.getElementsByClassName('boxes')[0];
  //const { scrollTop, ref } = useScroll();
  const elementRef = useRef<Element>(null);
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
    root: viewPort,
  });
  const mockCards = [
    <div className='box'>
      <img className=' w-full relative' src={MockCard1} />
    </div>,
    <div className='box'>
      <img className=' w-full relative' src={MockCard2} />
    </div>,
    <div className='box'>
      <img className=' w-full relative' src={MockCard3} />
    </div>,
    <div className='box'>
      <img className=' w-full relative' src={MockCard2} />
    </div>,
    <div className='box'>
      <img className=' w-full relative' src={MockCard1} />
    </div>,
  ];

  useEffect(() => {
    if (jwt) {
      getUser({ variables: { jwt } });
    }
  }, [jwt]);

  console.log(inView);
  console.log(entry);
  useEffect(() => {
    const element = entry?.target;
    if (entry?.isIntersecting) {
    }
  });

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
        <div className='boxes relative overflow-y-scroll  bg-gray-500'>
          <div className='wrapper'></div>
        </div>
      </div>

      <Navbar />
    </>
  );
};

export default MyPage;
