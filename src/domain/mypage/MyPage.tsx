import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import 'domain/mypage/style/MyPage.css';
import { Link } from 'react-router-dom';
import Menu from 'components/menu/Menu';

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
  if (error) {
    console.log(error);
  }

  if (!loading && data) {
    db_qr_list = data.getUserById.qr_list;
    db_qr_list.map((qr) => {
      item_name.push(qr.split('/:')[1]);
    });
  }

  return (
    <div className='home_special'>
      <Menu/>
      <div className='blank'>
        <div className='home__logo'>Collabo
        </div>
        <div className='point_group'>
          <div>{data?.getUserById?.name}님</div>
          <div className='point_group_inner'>
            <label className='point__label'>통합 포인트</label>
            <em>
              <strong id='point__value'>
                {data?.getUserById?.point?.toLocaleString()}
              </strong>
              원
            </em>
          </div>
        </div>
      </div>

      <div className='wallet_group'>
        <div className='wallet_inner'>
          {!loading &&
          data &&
          item_name?.map((cafe_name, index) => (
            <Link key={index} to={`/Detail/${cafe_name}`}>
              <div className='wallet__card'>
                <div className='margin_left'>{cafe_name}</div>
                <div className='cafe_info' />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
