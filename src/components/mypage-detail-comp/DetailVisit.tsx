import React from 'react';
import 'components/mypage-detail-comp/style/DetailVisit.css';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_MY_MILEAGE_LOG = gql`
  query GETMYMILEAGELOG($client_id: String!) {
    getMileageByClientId(client_id: $client_id) {
      price
      menu_name
    }
  }
`;

export default () => {

  const { data } = useQuery(GET_MY_MILEAGE_LOG, {
    variables: { client_id: '유성현' },
  });

  const small_menu = () => {
    alert('메뉴');
  };

  return (
      <div className='de_vi__content_group'>
        <div className='de_vi_first_block'>
          <div className='de_vi_first__check_img'>
            <img src='/detail/boll.svg' alt='' />
            <img src='/detail/check.svg' alt='' id='check' />
          </div>
          <div className='de_vi_first__data_group'>
            <div className='de_vi_first__branch'>스타벅스 강남역점</div>
            <div className='de_vi_first__day_and_time'>8.15 일 | 오후 3:00</div>
          </div>
          {/* 누르면 detail->menu 생성 (여기서 menu는 파일 하나를 추가해서 다루도록 함 */}
          <div className='de_vi_first__spot' onClick={small_menu}>
            <div className='dot' />
            <div className='dot' />
            <div className='dot' />
          </div>
        </div>
        <div className='de_vi_second_block'>
          <div className='de_vi_second__visit_times'>3번째 방문</div>
          <div className='de_vi_second__data_group'>
            <div className='de_vi_second__menu'>{data?.getMileageByClientId?.menu_name}</div>
            <div className='de_vi_second__price'>{data?.getMileageByClientId?.price.toLocaleString()}원</div>
          </div>
        </div>
        <div className='de_vi_third_block'>
          <div className='de_vi_third__flavour'>맛 5.6</div>
          <div className='de_vi_third__atmosphere'>분위기 7.2</div>
          <div className='de_vi_third__price'>가격 4.4</div>
        </div>
      </div>
  );
}