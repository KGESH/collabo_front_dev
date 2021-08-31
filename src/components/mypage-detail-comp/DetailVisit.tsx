import React from 'react';
import 'components/mypage-detail-comp/style/DetailVisit.css';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import SmallMenu from '../small-menu/SmallMenu';

const GET_MY_MILEAGE_LOG = gql`
  query GETMYMILEAGELOG($client_id: Int!) {
    getMileageLogByClientId(client_id: $client_id) {
      price
      menu_name
    }
  }
`;

export default () => {

  const { data } = useQuery(GET_MY_MILEAGE_LOG, {
    variables: { client_id: 11700 },
  });
  const log_data = data?.getMileageLogByClientId[0];
  // 수정 필요


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
          <SmallMenu mode='visit'/>
        </div>
        <div className='de_vi_second_block'>
          <div className='de_vi_second__visit_times'>3번째 방문</div>
          <div className='de_vi_second__data_group'>
            <div className='de_vi_second__menu'>{log_data?.menu_name}</div>
            <div className='de_vi_second__price'>{log_data?.price?.toLocaleString()}원</div>
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