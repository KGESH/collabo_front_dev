import React, { useEffect, useState } from 'react';
import 'domain/mypage-detail/style/MypageDetail.css';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import DetailVisit from 'components/mypage-detail-comp/DetailVisit';
import DetailReview from 'components/mypage-detail-comp/DetailReview';
import DetailBeans from 'components/mypage-detail-comp/DetailBeans';

/**
 * client side query 오타 조심.
 * 인자 이름도 서버의 스키마와 맞춰줘야함
 * 날짜 적어두는거 좋네요
 * (21-8-13:지성현)
 */

const MypageDetail = () => {

  const [click, setClick] = useState('visit');
  const fnc = (e: any) => {
    setClick(e.currentTarget.id);
  };

  const params:any = useParams();

  return (
    <div className='detail__special'>
      <div className='detail__first_block'>
        <div className='de_first__card_img'>
          <img src='/detail/st_card.png' alt='' id='detail_card_img' />
        </div>
        <div className='de_first__cafe_name'>{params.cafe}</div>
      </div>
      <div className='detail__second_block'>
        <input type='radio' id='visit' name='radios' onClick={fnc} checked={click === 'visit'}/>
        <label htmlFor='visit'>
          <div id='visit' className='de_second__visit d_s_border'>방문</div>
        </label>
        <input type='radio' id='review' name='radios' onClick={fnc} checked={click === 'review'}/>
        <label htmlFor='review'>
          <div id='review' className='de_second__review d_s_border' >리뷰</div>
        </label>
        <input type='radio' id='beans' name='radios'  onClick={fnc} checked={click === 'beans'}/>
        <label htmlFor='beans'>
          <div id='beans' className='de_second__beans d_s_border'>원두</div>
        </label>
      </div>
      { click === 'visit' ? <DetailVisit /> : ""}
      { click === 'review' ? <DetailReview />: ""}
      { click === 'beans' ? <DetailBeans />: ""}


    </div>
  );
};

export default MypageDetail;
