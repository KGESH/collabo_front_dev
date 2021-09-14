import React, { useEffect, useState } from 'react';
import Modal from 'components/modal-frame/Modal';
import { IModalFrameProps } from 'types/Props';
import { useInput } from 'hooks/useInput';
import {
  hashTagListVar,
  hashTagQueryVar,
} from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';
import {
  handleRemoveTagListItem,
  handleAddTag,
  handleAddTagByQuery,
  tagValidator,
} from './HandleTagList';
import { createFuzzyMatcher } from 'components/auto-complete-search/CreateFuzzyMatcher';
import { IHashTag } from 'types/HashTag';
import 'components/review-form/style/HashTagModal.css';

const HashTagModal = (props: IModalFrameProps) => {
  const { isOpen, handleClose } = props;
  const hashTagList = useReactiveVar(hashTagListVar);
  const hashTagQuery = useReactiveVar(hashTagQueryVar);
  const hashTagInput = useInput('', tagValidator);
  const [hashTagSearchList, setHashTagSearchList] = useState<IHashTag[]>([]);

  useEffect(() => {
    if (hashTagInput.value === '') {
      setHashTagSearchList([]);
      return;
    }
    const regex = createFuzzyMatcher(hashTagInput.value);
    const regexMinusOne = createFuzzyMatcher(
      hashTagInput.value.length > 1
        ? hashTagInput.value
            .trim()
            .substr(0, hashTagInput.value.trim().length - 1)
        : hashTagInput.value,
    );
    const regexRemoveSpace = createFuzzyMatcher(hashTagInput.value.trim());
    setHashTagSearchList(
      hashTagQuery.filter(
        (hashTag: IHashTag, index: number) =>
          regex.test(hashTag.name.toLowerCase()) ||
          regexMinusOne.test(hashTag.name.toLowerCase()) ||
          regexRemoveSpace.test(hashTag.name.toLowerCase()),
      ),
    );
    console.log(hashTagInput.value);
    console.log(hashTagSearchList);
  }, [hashTagInput.value]);

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} header='해시태그 추가'>
      <input
        className='modal_hash_tag_input'
        placeholder='태그 입력'
        value={hashTagInput.value}
        onChange={hashTagInput.onChange}
      />
      <button
        className='modal_hash_tag_add_button'
        onClick={() => handleAddTag(hashTagInput)}
      >
        +
      </button>
      <ul className='modal_hash_tag_ul'>
        {hashTagSearchList.map((matchedHashTag: IHashTag, index: number) => {
          return (
            <li
              key={index}
              onClick={() => {
                handleAddTagByQuery(matchedHashTag.name);
                hashTagInput.clear();
              }}
            >
              <span className='modal_hash_tag_mathched_hash_tag'>
                {matchedHashTag.name + '   '}
              </span>
              <br />
            </li>
          );
        })}
      </ul>
      <ul className='modal_hash_tag_ul'>
        {hashTagList.map((tag: string, index: number) => {
          return (
            <li key={index}>
              <span>{tag}</span>
              <button onClick={() => handleRemoveTagListItem(index)}>-</button>
              <br />
            </li>
          );
        })}
      </ul>
    </Modal>
  );
};

export default HashTagModal;
