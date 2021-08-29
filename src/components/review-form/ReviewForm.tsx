import React, { useState, useRef, useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { currentUserVar } from 'services/apollo-client/LocalState';
import 'components/review-form/style/ReviewForm.css';
import PlusIcon from 'resources/images/PostReview.svg';
import TextareaAutosize from 'react-textarea-autosize';
import HashTagModal from 'components/review-form/HashTagModal';

const ReviewForm = () => {
  const ref = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const user = useReactiveVar(currentUserVar);
  const [imgBase64, setImgBase64] = useState('');
  const [img, setImg] = useState<File | null>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;

    if (files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        console.log(`call onload`);
        const base64 = reader.result;
        if (base64) {
          console.log(`call base64`);

          setImgBase64(base64.toString());
          console.log(base64);
        }
      };
    }
  };

  return (
    <>
      <section className='review__container'>
        <img className='review__profile_img' src={user?.profile_img} alt='' />
        <TextareaAutosize
          className='review__contents'
          minRows={1}
          placeholder='내용 입력'
        />
        <label htmlFor='input_img'>
          {imgBase64 ? (
            <img src={imgBase64} className='review__selected_img' />
          ) : (
            <img src={PlusIcon} className='review__selected_img' />
          )}
          <input
            type='file'
            className='review__img_selector'
            id='input_img'
            accept='image/*'
            onChange={handleChangeFile}
          />
        </label>
      </section>
      <div className='review__add_payment_history'>방문 카페</div>
      <div
        className='review__add_hash_tag'
        onClick={() => {
          openModal();
        }}
      >
        해시태그 추가
      </div>
      <HashTagModal isOpen={modalOpen} handleClose={closeModal} />
    </>
  );
};

export default ReviewForm;
