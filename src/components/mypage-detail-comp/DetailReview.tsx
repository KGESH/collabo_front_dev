import React from 'react';
import 'components/mypage-detail-comp/style/DetailReview.css';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import SmallMenu from '../small-menu/SmallMenu';


const GET_MY_REVIEW = gql`
  query GETMYREVIEW($key: String!) {
    getReviewByKey(key: $key) {
      user_name
      content
      like
      map
      star {
        flavor
        atmosphere
        price
      }
    }
  }
`;

export default () => {

  const { loading, data, error } = useQuery(GET_MY_REVIEW, {
    variables: { key: 'C73RF' },
  });

  return (
    <>
      {!loading && data && data.getReviewByKey.map((review: any, index: number) => (
        <div className='de_re__content_group'>
          <div className='de_re_first_block'>
            <div className='de_re_first__check_img'>
              <img src='/detail/boll.svg' alt='' />
              <img src='/detail/check.svg' alt='' id='check' />
            </div>
            <div className='de_re_first__data_group'>
              <div className='de_re_first__branch'>스타벅스 강남역점</div>
              <div className='de_re_first__day_and_time'>8.15 일 | 오후 3:00</div>
            </div>
            <SmallMenu mode='review'/>
          </div>

          <div className='de_re_second__block'>
            <img
              src='https://ww.namu.la/s/b39cd616b1d08bd30a1c70a540f5be19bd03c64df162d0e6030ec9611196a1b3afff3af84e1d56c65ff7ad6a686578a893aedb785886957028b63d16b1dcc9fd4f07df5c0e8ffb0651a5102ff6d04ef866356e65859c2d324bf17342156e18b8187ca517f6142659af0d2aba2e4d73cb'
              alt='' />
          </div>

          <div className='de_re_third_block'>
            <div className='star'>
              {/* 맛 분위기 가격은 몽고.review.star에서 받아온다. */}
              <div className='de_re_third__flavour'>맛 {review.star.flavor}</div>
              <div className='de_re_third__atmosphere'>분위기 {review.star.atmosphere}</div>
              <div className='de_re_third__price'>가격 {review.star.price}</div>
            </div>
            <div className='evaluation_member'>
              <div className='eva_like eva_center'>
                <img className='de_icon' src='/detail/review/heart.png' alt='' />
                <span>{review.like}</span>
              </div>
              <div className='eva_map eva_center'>
                <img className='de_icon' src='/detail/review/position.png' alt='' />
                <span>{review.map}</span>
              </div>
            </div>
            <div className='review_content'>
              <p>{review.content}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

