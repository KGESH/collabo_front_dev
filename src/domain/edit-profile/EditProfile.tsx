import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation, useReactiveVar } from '@apollo/client';
import {
  currentUserVar,
  uploadImgBase64ListVar,
  uploadImgListVar,
} from 'services/apollo-client/LocalState';
import { useInput } from 'hooks/useInput';
import { tagValidator } from 'components/review-form/HandleTagList';
import defaultThumbnail from 'resources/images/navbar/mock_user.gif';
import { handleChangeFile } from 'components/upload/HandleChangeFile';
import { IUser } from 'types/User';

const UPDATE_PROFILE = gql`
  mutation UPDATE_PROFILE($profile: Profile) {
    updateProfile(profile: $profile)
  }
`;

const UPDATE_NICKNAME_ONLY = gql`
  mutation UPDATE_NICKNAME($nickname: String!) {
    updateNickname(nickname: $nickname)
  }
`;

const UPDATE_PROFILE_IMAGE_ONLY = gql`
  mutation UPDATE_PROFILE_IMAGE($file: Upload!) {
    updateUserImage(file: $file)
  }
`;

/** 검사자 작성 필요 */
const EditProfile = () => {
  const user = useReactiveVar(currentUserVar);
  const nameInput = useInput('', tagValidator);
  const profileImg = useReactiveVar(uploadImgBase64ListVar);
  const uploadImgList = useReactiveVar(uploadImgListVar);
  const history = useHistory();
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [updateNickname] = useMutation(UPDATE_NICKNAME_ONLY);
  const [updateProfileImage] = useMutation(UPDATE_PROFILE_IMAGE_ONLY);

  const handleUpdateProfile = () => {
    if (!nameInput.value.trim()) {
      /**
       * white space handling
       */
      nameInput.clear();
      return;
    }

    /** 변경사항 없이 수정 버튼 눌렀을 경우 */
    if (nameInput.value === user?.nickname && !uploadImgList) {
      history.push('/mypage');
    }

    if (uploadImgList) {
      /** 닉네임, 프로필사진 둘 다 바꾸는 경우 */
      if (nameInput.value !== user?.nickname) {
        updateProfile({
          variables: { profile: { nickname: nameInput.value, file: uploadImgList[0] } },
        });
        currentUserVar({
          ...(user as IUser),
          nickname: nameInput.value,
          profile_img: profileImg[0],
        });
        /** 프로필 사진만 바꾸는 경우 */
      } else {
        updateProfileImage({ variables: { file: uploadImgList[0] } });
        currentUserVar({ ...(user as IUser), profile_img: profileImg[0] });
      }
      /** 닉네임만 바꾸는 경우 */
    } else {
      updateNickname({ variables: { nickname: nameInput.value } });
      currentUserVar({ ...(user as IUser), nickname: nameInput.value });
    }

    history.push('/mypage');
  };

  useEffect(() => {
    if (user) {
      nameInput.setValue(user.nickname);
    }
    if (user?.profile_img === 'defaultThumbnail' || user?.profile_img === undefined) {
      uploadImgBase64ListVar([defaultThumbnail]);
    } else {
      uploadImgBase64ListVar([user?.profile_img]);
    }
  }, [user]);

  /** css 파일 생성예정 */
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
        <button className='text-right mx-2 text-6xl text-blue-300' onClick={handleUpdateProfile}>
          ✓
        </button>
      </header>
      <section className='w-screen h-screen flex flex-col items-center'>
        <label htmlFor='input_img'>
          <img className='w-10 h-10 border border-black rounded-full' src={profileImg[0]} />
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
          placeholder='닉네임'
          value={nameInput.value}
          onChange={nameInput.onChange}
        />
      </section>
    </>
  );
};

export default EditProfile;
