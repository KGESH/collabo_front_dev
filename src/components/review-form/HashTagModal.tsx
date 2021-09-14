import React, { useEffect, useState } from 'react';
import Modal from 'components/modal-frame/Modal';
import { IModalFrameProps } from 'types/Props';
import { useInput } from 'hooks/useInput';
import { hashTagListVar } from 'services/apollo-client/LocalState';
import { useReactiveVar } from '@apollo/client';
import {
  handleRemoveTagListItem,
  handleAddTag,
  tagValidator,
} from './HandleTagList';
import { createFuzzyMatcher } from 'components/auto-complete-search/CreateFuzzyMatcher';
import { HashTagList } from 'components/review-form/HashTagList';
import { IHashTag } from 'types/Map';

const HashTagModal = (props: IModalFrameProps) => {
  const { isOpen, handleClose } = props;
  const tagList = useReactiveVar(hashTagListVar);
  const tagInput = useInput('', tagValidator);
  const [hashTagSearchList, setHashTagSearchList] = useState<IHashTag[]>([]);

  useEffect(() => {
    if (tagInput.value === '') {
      setHashTagSearchList([]);
      return;
    }
    const regex = createFuzzyMatcher(tagInput.value);
    const regexMinusOne = createFuzzyMatcher(
      tagInput.value.length > 1
        ? tagInput.value.trim().substr(0, tagInput.value.trim().length - 1)
        : tagInput.value,
    );
    const regexRemoveSpace = createFuzzyMatcher(tagInput.value.trim());
    setHashTagSearchList(
      HashTagList.filter(
        (hashTag: IHashTag) =>
          regex.test(hashTag.name.toLowerCase()) ||
          regexMinusOne.test(hashTag.name.toLowerCase()) ||
          regexRemoveSpace.test(hashTag.name.toLowerCase()),
      ),
    );
    console.log(tagInput.value);
    console.log(hashTagSearchList);
    console.log(HashTagList);
  }, [tagInput.value]);

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} header='해시태그 추가'>
      <input
        className='modal_hash_tag_input'
        placeholder='태그 입력'
        value={tagInput.value}
        onChange={tagInput.onChange}
      />
      <button
        className='modal_hash_tag_add_button'
        onClick={() => handleAddTag(tagInput)}
      >
        +
      </button>
      <div>
        {hashTagSearchList.map((matchedHashTag: IHashTag) => {
          return (
            <>
              <span className='modal_hash_tag_mathched_hash_tag'>
                {matchedHashTag.name + '   '}
              </span>
              <br />
            </>
          );
        })}
      </div>
      <div>
        {tagList.map((tag, index) => {
          return (
            <>
              <span>{tag}</span>
              <button onClick={() => handleRemoveTagListItem(index)}>-</button>
              <br />
            </>
          );
        })}
      </div>
    </Modal>
  );
};

export default HashTagModal;
