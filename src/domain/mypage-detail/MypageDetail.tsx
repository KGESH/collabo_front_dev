import React from 'react';
import 'domain/mypage-detail/style/MypageDetail.css';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode';

const MypageDetail = () => {

  const params:any = useParams();

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