import React, { useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import {
  currentUserVar,
  hashTagListVar,
  reviewContentVar,
  uploadImgBase64Var,
} from 'services/apollo-client/LocalState';
import 'components/review-form/style/ReviewForm.css';
import PlusIcon from 'resources/images/PostReview.svg';
import TextareaAutosize from 'react-textarea-autosize';
import HashTagModal from 'components/review-form/HashTagModal';
import { handleRemoveTagListItem } from 'components/review-form/HandleTagList';
import { handleChangeFile } from 'components/review-form/HandleChangeFile';

const ReviewForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useReactiveVar(currentUserVar);
  const imgBase64 = useReactiveVar(uploadImgBase64Var);
  const tagList = useReactiveVar(hashTagListVar);
  const content = useReactiveVar(reviewContentVar);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className='review__container'>
        <img className='review__profile_img' src={user?.profile_img} alt='' />
        <TextareaAutosize
          className='review__contents'
          minRows={1}
          placeholder='내용 입력'
          value={content}
          onChange={(event) => reviewContentVar(event.target.value)}
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
      <div className='review__add_hash_tag' onClick={openModal}>
        해시태그 추가
      </div>
      {tagList.map((tag, index) => {
        return (
          <>
            <span>{tag}</span>
            <button onClick={() => handleRemoveTagListItem(index)}>-</button>
            <br />
          </>
        );
      })}

      <HashTagModal isOpen={isModalOpen} handleClose={closeModal} />
    </>
  );
};

export default ReviewForm;
