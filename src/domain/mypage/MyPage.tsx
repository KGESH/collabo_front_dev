import React, { useEffect } from 'react';
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
  console.log(user);
  console.log(jwt);
  const [getUser, { loading, data, error }] = useMutation(GET_USER);
  const cardClick = (index: number) => {
    document.getElementsByClassName('my_qr_box')[index].classList.toggle('hidden');
  };

  useEffect(() => {
    if (jwt) {
      getUser({ variables: { jwt } });
    }
  }, [jwt]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const boxes: any = document.querySelectorAll('.box');

      function getIntersectionRatio(i: number) {
        const a = [window.scrollY, window.scrollY + window.innerHeight];
        const b = [boxes[i].offsetTop, boxes[i].offsetTop + boxes[i].clientHeight];

        const max = Math.max(a[0], b[0]);
        const min = Math.min(a[1], b[1]);

        return Math.max(0, (min - max) / (b[1] - b[0]));
      }

      function onScroll() {
        const boxes: any = document.querySelectorAll('.box');
        for (let i = 0; i < boxes.length; i += 1) {
          const intersection = getIntersectionRatio(i);
          const top = boxes[i].offsetTop - window.pageYOffset < 0;
          if (boxes[i]?.firstChild?.style) {
            boxes[i].firstChild.style.cssText = `
            transform-origin: ${top ? 'center center' : 'top center'};
            position: ${top ? 'fixed' : 'absolute'};
            transform: scale(${intersection});
            opacity: ${intersection};
          `;
          }
        }
        requestAnimationFrame(onScroll);
      }
      onScroll();
    });
  });

  return (
    <>
      <div className='flex flex-col items-center w-screen h-screen'>
        <Header menu={true} />
        <div>
          <div className='my_point_group'>
            <em>
              <strong className='text-5xl font-serif'>{user?.point}</strong>
            </em>
          </div>
        </div>
        <div className=' flex flex-col bg-gray-500 h-1/2 items-center overflow-y-scroll'>
          <img className='w-full h-auto box' src={MockCard1} />
          <img className='w-full h-auto box' src={MockCard1} />
          <img className='w-full h-auto box' src={MockCard2} />
          <img className='w-full h-auto box' src={MockCard2} />
          <img className='w-full h-auto box' src={MockCard2} />
          <img className='w-full h-auto box' src={MockCard2} />
          <img className='w-full h-auto box' src={MockCard3} />
          <img className='w-full h-auto box' src={MockCard3} />
          <img className='w-full h-auto box' src={MockCard3} />
          <img className='w-full h-auto box' src={MockCard3} />
          <img className='w-full h-auto box' src={MockCard3} />
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
