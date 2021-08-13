import React from 'react';
import 'domain/mypage-detail/style/MypageDetail.css';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_CAFE = gql`
    query GETCAFE($name: String!){
        getCafeByName(name: $name) {
            name
            cafe_info
            been_info
        }
    }
`;

const MypageDetail = () => {
  const params:any = useParams();
  const {loading, data, error} = useQuery(GET_CAFE, {
    variables: { name: params.cafe }
  })



  // QRCode.toDataURL("http://naver.com", function(err, url) {
  //   img = url;
  // });

  return (
    <>
      <div className="detail__cafe_name">Mypage에서 받아온 카페 이름 = {params.cafe}</div>
      <div className='detail__cafe_info'>정보{!loading && data && data.getCafeByName.cafe_info}</div>
      <div className='detail__been_info'>원두 정보{!loading && data && data.getCafeByName.been_info}</div>
    </>
  );
};

export default MypageDetail;