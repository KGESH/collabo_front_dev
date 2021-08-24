import React from 'react';
import 'components/mypage-detail-comp/style/DetailBeans.css';

export default () => {
  return (
    <div>
      <div className='beans_member'>
        <div>subscribed for</div>
        <div id='beans_age'>3</div>
        <div>month</div>
      </div>
      <div>
        원두 업체에서 제공받은 이미지가 출력됩니다.
      </div>
    </div>
  );
}