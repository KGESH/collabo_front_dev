import React, { useEffect, useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import 'domain/mypage/style/MyPage.css';
import Navbar from 'components/navbar/Navbar';
import QRCode from 'qrcode.react';
import Header from 'components/header/Header';

const GET_USER = gql`
  query GETUSER($id: Int!) {
    getUserById(id: $id) {
      cafe_list {
        cafe_name
        code
        card_img
      }
      point
    }
  }
`;

const MyPage = () => {

  const { loading, data, error } = useQuery(GET_USER, {
    variables: { id: 11700 /* 불러올 아이디 */ },
  });
  const cardClick = (index: number) => {
    document.getElementsByClassName('my_qr_box')[index].classList.toggle('hidden');
  };

  /**
   * 시도한 방법 1: 현재 카드들의 상대좌표를 구해서 'a'px ~ 'b'px 까지 translate() 를 실행한다. // 실패
   * 시도한 방법 2: 현재 중앙에 놓여있는 카드를 main 카드라고 지정하고 main-2, main-1, main, main+1, main+2 의 카드에 각각 모션을 부여한다. // 실패
   *
   * 카드의 위치에 따라서 size 및 translateY 를 변경하려고 시도했으나
   * 카드의 사이즈가 변경되거나 이동할 시 스크롤을 포함한 전체적인 페이지 크기가 변경되므로
   * 스크롤이 위아래로 튕기는 현상이 나타난다.
   * 그러므로 카드의 위치를 임의적으로 수정은 불가능하다.
   *
   * 참고할 내용 : https://elvanov.com/2195
   * */
  // useEffect(() => {
  //   let card: any = document.getElementsByClassName('my_wallet__card');
  //   let inner: any = document.getElementsByClassName('my_wallet_inner')[0];
  //   let middle: number = inner.getBoundingClientRect().top + inner.getBoundingClientRect().height / 2;
  //
  //   inner.addEventListener('scroll', () => {
  //     if (data && data.getUserById) {
  //       for (let i: number = 0; i < data.getUserById.cafe_list.length; i++) {
  //         let position: number = card[i].getBoundingClientRect().top - middle + (card[i].getBoundingClientRect().height / 2);
  //         /** 영역: -402, -241, -80(중간), 80, 241*/
  //
  //         if (position < 5 && position > -5) {
  //           let j: number = i;
  //           // 현재 카드 이동
  //           card[j].style.transform = `rotate(${position}deg)`;
  //           if (j >= 1) {
  //             // 상위 카드
  //             console.log(j);
  //             card[j - 1].style.transform = `rotate(${position}deg)`;
  //           }
  //           if (j >= 2) {
  //             // 최상위 카드
  //             card[j - 2].style.transform = `rotate(0.5turn)`;
  //           }
  //           if (data.getUserById.cafe_list.length - j <= 1) {
  //             // 하위 카드
  //
  //           } else if (data.getUserById.cafe_list.length - j <= 2) {
  //             // 최하위 카드
  //
  //           }
  //         }
  //
  //
  //       }
  //     }
  //
  //
  //   });
  // }, [loading]);

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
            {!loading && data && data.getUserById.cafe_list.map((w: any, index: number) => (
              <div className='my_wallet__card' onClick={() => cardClick(index)}>
                <img src={w.card_img} alt='' />
                <div className='my_qr_box hidden'>
                  <div className='my_qr_code'>
                    {/* user정보에 있는 '카페이름'과 해당 카페의 'Code'를 가져와서 아래 링크로 가는 QR코드를 생성한다. */}
                    <QRCode value={`localhost:3000/qrcheck/${w.cafe_name}/${w.code}`} size={100} level={'L'} />
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
