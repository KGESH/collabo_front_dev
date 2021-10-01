import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { gql, useReactiveVar } from '@apollo/client';
import { currentUserVar, uploadImgBase64ListVar } from 'services/apollo-client/LocalState';
import { useInput } from 'hooks/useInput';
import { tagValidator } from 'components/review-form/HandleTagList';
import mock_user_img from 'resources/images/navbar/mock_user.gif';
import { handleChangeFile } from 'components/upload/HandleChangeFile';

const UPDATE_PROFILE = gql`
  mutation UPDATE_PROFILE($review: ReviewInput!) {
    postReview(review: $review) {
      success
      message
    }
  }
`;

/** 검사자 작성 필요 */
const ProfileEdit = () => {
  const user = useReactiveVar(currentUserVar);
  const nameInput = useInput('', tagValidator);
  const imgBase64List = useReactiveVar(uploadImgBase64ListVar);
  const history = useHistory();
  return (
    <>
      <header className='grid grid-cols-4 items-center'>
        <button
          className='text-6xl text-left mx-3 text-gray-400'
          onClick={() => {
            uploadImgBase64ListVar([]);
            history.push('/mypage');
          }}
        >
          &times;
        </button>
        <h1 className='col-span-2 text-xl '>프로필 편집</h1>
        <button className='text-right mx-2 text-6xl text-blue-300'>✓</button>
      </header>
      <section className='w-screen h-screen flex flex-col items-center'>
        <label htmlFor='input_img'>
          {imgBase64List[0] ? (
            <img src={imgBase64List[0]}></img>
          ) : (
            <img className='w-10 h-10 border border-black rounded-full' src={mock_user_img} />
          )}
          <input
            type='file'
            className='hidden'
            id='input_img'
            accept='image/*'
            onChange={handleChangeFile}
          />
        </label>

        <p className='m-3'>프로필 사진 변경</p>
        <input
          className='border-b'
          placeholder='이름'
          value={nameInput.value}
          onChange={nameInput.onChange}
        />
      </section>
    </>
  );
};

export default ProfileEdit;
