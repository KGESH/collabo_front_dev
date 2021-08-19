import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import 'domain/mypage/style/MyPage.css';
import { Link } from 'react-router-dom';
import Camera from 'components/header/camera/Camera';
import Navbar from 'components/navbar/Navbar';
import QRCode from 'qrcode.react';
import Header from 'components/header/Header';

const GET_USER = gql`
  query GETUSER($id: Int!) {
    getUserById(id: $id) {
      name
      qr_list
      point
    }
  }
`;

const MyPage = () => {
  let db_qr_list: string[] = [];
  let item_name: string[] = [];

  const { loading, data, error } = useQuery(GET_USER, {
    variables: { id: 11700 /* 불러올 아이디 */ },
  });

  if (!loading && data) {
    db_qr_list = data.getUserById.qr_list;
    db_qr_list.map((qr) => {
      item_name.push(qr.split('/:')[1]);
    });
  }

  const cardClick = (index: number) => {
    document.getElementsByClassName('my_qr_box')[index].classList.toggle('hidden');
  };

  return (
    <>
      <div className='my_group'>
        <Header menu={true} />
        <Camera />
        <div onClick={()=> {
          console.log(document.getElementsByClassName('my_qr_code')[5].scrollTop);
        }}>버튼</div>
        <div>
          <div className='my_point_group'>
            <em>
              <strong id='point_value'>
                {data?.getUserById?.point?.toLocaleString()}
              </strong>
            </em>
          </div>
        </div>
        {/* 스크롤 바 위치를 구해서 가운대 위치하고있으면 z-index 를 높여서 출력하고, 위 또는 아래에 있으면 transform -> scale을 사용해서 크기를 줄인다. 그리고 더 상단 혹은 더 하단으로 이동하면 opacity를 0으로 줄여서 지운다.*/}
        <div className='my_wallet_group'>
          <div className='my_wallet_inner'>
            {!loading && data && item_name?.map((cafe_name, index) => (
              <div className='my_wallet__card' onClick={() => cardClick(index)}>
                <img src='https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreditAXFBZE.png' alt='' />
                <div className='my_qr_box hidden'>
                  <div className='my_qr_code'>
                    <QRCode value={'https://www.naver.com/'} size={100} level={'L'} />
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
