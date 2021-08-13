import React from 'react';
import 'domain/mypage-detail/style/MypageDetail.css';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

/**
 * client side query 오타 조심.
 * 인자 이름도 서버의 스키마와 맞춰줘야함
 * 날짜 적어두는거 좋네요
 * (21-8-13:지성현)
 */
const GET_CAFE = gql`
  query GETCAFE($name: String!) {
    getCafeByName(name: $name) {
      cafe_name
      cafe_info
      bean_info
    }
  }
`;

const MypageDetail = () => {
  const params: any = useParams();
  const { loading, data, error } = useQuery(GET_CAFE, {
    variables: { name: params.cafe },
  });

  if (error) {
    console.log(`My Page Detail error!`);
    console.log(error);
  }

  if (!loading) {
    console.log(data);
  }

  return (
    <>
      <div className='detail__cafe_name'>
        Mypage에서 받아온 카페 이름 = {params.cafe}
      </div>
      <div className='detail__cafe_info'>
        정보{data?.getCafeByName?.cafe_info}
      </div>
      <div className='detail__been_info'>
        원두 정보{data?.getCafeByName?.bean_info}
      </div>
    </>
  );
};

export default MypageDetail;
