import React, { useEffect, useState } from 'react';
import 'domain/mypage-detail/style/MypageDetail.css';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import DetailVisit from 'components/mypage-detail-comp/DetailVisit';
import DetailReview from 'components/mypage-detail-comp/DetailReview';
import DetailBeans from 'components/mypage-detail-comp/DetailBeans';

const GET_CAFE = gql`
  query ($name: String!) {
    getCafeByName(name: $name) {
      cafe_info{
        name
        card_img
      }
    }
  }
`;

const MypageDetail = () => {

  const [click, setClick] = useState('visit');
  const fnc = (e: any) => {
    setClick(e.currentTarget.id);
  };
  const params: any = useParams();
  const { loading, data, error } = useQuery(GET_CAFE, {
    variables: { name: params.name },
  });
  if(data) {
    console.log("데이터" + data);
  }

  return (
    <div className='detail__special'>
      <div className='detail__first_block'>
        <div className='de_first__card_img'>
          {/* 카드 이미지는 몸고.cafes.cafe_info.card_img에 url 형태로 저장시키고 받아오도록 한다. */}
          <img src={data?.getCafeByName?.cafe_info?.card_img} alt='' id='detail_card_img' />
        </div>
        <div className='de_first__cafe_name'>{data?.getCafeByName?.cafe_info?.name}</div>
      </div>
      <div className='detail__second_block'>
      <input className='de_second__input_radio' type='radio' id='visit' name='radios' onClick={fnc} checked={click === 'visit'}/>
        <label htmlFor='visit'>
          <div id='visit' className='de_second__visit d_s_border'>방문</div>
        </label>
        <input className='de_second__input_radio' type='radio' id='review' name='radios' onClick={fnc} checked={click === 'review'}/>
        <label htmlFor='review'>
          <div id='review' className='de_second__review d_s_border' >리뷰</div>
        </label>
        <input className='de_second__input_radio' type='radio' id='beans' name='radios'  onClick={fnc} checked={click === 'beans'}/>
        <label htmlFor='beans'>
          <div id='beans' className='de_second__beans d_s_border'>원두</div>
        </label>
      </div>
      {click === 'visit' ? <DetailVisit /> : ''}
      {click === 'review' ? <DetailReview /> : ''}
      {click === 'beans' ? <DetailBeans /> : ''}


    </div>
  );
};

export default MypageDetail;
