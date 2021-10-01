import React, { useEffect, useRef, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import {
  currentUserVar,
  hashTagListVar,
  reviewContentVar,
  uploadImgBase64ListVar,
} from 'services/apollo-client/LocalState';
import 'components/review-form/style/ReviewForm.css';
import PlusIcon from 'resources/images/PostReview.svg';
import TextareaAutosize from 'react-textarea-autosize';
import HashTagModal from 'components/review-form/HashTagModal';
import { handleRemoveTagListItem } from 'components/review-form/HandleTagList';
import { handleChangeFile } from 'components/upload/HandleChangeFile';
import VisitCafeModal from './VisitCafeModal';

const ReviewForm = () => {
  const [isHashTagModalOpen, setIsHashTagModalOpen] = useState(false);
  const [isVisitCafeModalOpen, setIsVisitCafeModalOpen] = useState(false);
  const user = useReactiveVar(currentUserVar);
  const imgBase64List = useReactiveVar(uploadImgBase64ListVar);
  const tagList = useReactiveVar(hashTagListVar);
  const content = useReactiveVar(reviewContentVar);
  const openHashTagModal = () => setIsHashTagModalOpen(true);
  const closeHashTagModal = () => setIsHashTagModalOpen(false);
  const openVisitCafeModal = () => setIsVisitCafeModalOpen(true);
  const closeVisitCafeModal = () => setIsVisitCafeModalOpen(false);

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
          {imgBase64List[0] ? (
            <img src={imgBase64List[0]} className='review__selected_img' />
          ) : (
            <img src={PlusIcon} className='review__selected_img' />
          )}
          <input
            type='file'
            className='review__img_selector'
            id='input_img'
            accept='image/*'
            multiple
            onChange={handleChangeFile}
          />
        </label>
      </section>
      <div className='review__add_payment_history' onClick={openVisitCafeModal}>
        방문 카페
      </div>
      <div className='review__add_hash_tag' onClick={openHashTagModal}>
        해시태그 추가
      </div>
      <ul className='modal_hash_tag_ul'>
        {tagList.map((tag: string, index: number) => {
          return (
            <li key={index}>
              <span>{tag}</span>
              <button onClick={() => handleRemoveTagListItem(index)}>-</button>
              <br />
            </li>
          );
        })}
      </ul>

      <HashTagModal isOpen={isHashTagModalOpen} handleClose={closeHashTagModal} />
      <VisitCafeModal isOpen={isVisitCafeModalOpen} handleClose={closeVisitCafeModal} />
    </>
  );
};

export default ReviewForm;
