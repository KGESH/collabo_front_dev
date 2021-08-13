import React from 'react';
import 'domain/mypage-detail/style/MypageDetail.css';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_CAFE = gql`
    query GETCAFE($cafe_name: String!){
        getCafeByName(cafe_name: $cafe_name) {
            cafe_name
            cafe_info
            been_info
        }
    }
`;

const MypageDetail = () => {
  const params:any = useParams();
  const {loading, data, error} = useQuery(GET_CAFE, {
    variables: { id: params.cafe/* 클릭한 정보를 파라미터로 받아와, query문에 입력됨 */ }
  })
  /** Mypage에서 스타벅스를 클릭하면 query문을 통해 스타벅스 카페의 정보를 가져온다. */
  console.log(data);

  // QRCode.toDataURL("http://naver.com", function(err, url) {
  //   img = url;
  // });

  return (
    <>
      <div className="detail__cafe_name">Mypage에서 받아온 카페 이름 = {params.cafe}</div>
      <div className='detail__cafe_info'>정보</div>
      <div className='detail__been_info'>원두 정보</div>
    </>
  );
};

export default MypageDetail;