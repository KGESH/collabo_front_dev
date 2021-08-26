import React, { useState, useRef } from 'react';
import { useReactiveVar } from '@apollo/client';
import { currentUserVar } from 'services/apollo-client/LocalState';
import 'components/review-form/style/ReviewForm.css';
import test from 'components/review-form/style/test.svg';

const ReviewForm = () => {
  const user = useReactiveVar(currentUserVar);
  const [imgBase64, setImgBase64] = useState('');
  const [img, setImg] = useState<File | null>(null);

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (event?.target?.files) {
      reader.readAsDataURL(event.target.files[0]);
      setImg(event.target.files[0]);
    }
  };
  return (
    <div className='review__form'>
      <div className='review__container'>
        <img className='review__profile_img' src={user?.profile_img} alt='' />
        <input className='review__contents' />
        <label htmlFor='input_img'>
          {imgBase64 ? (
            <img src={imgBase64} className='review__selected_img' />
          ) : (
            <>
              <span>input</span>
            </>
          )}
          <input
            type='file'
            className='review__img_selector'
            id='input_img'
            accept='image/*'
            onChange={handleChangeFile}
          />
        </label>
      </div>
      <div className='review__add_payment_history'>방문 카페</div>
      <div className='review__add_hash_tag'>해시태그 추가</div>
    </div>
  );
};

export default ReviewForm;
