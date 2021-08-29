import React from 'react';
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

const HashTagModal = (props: IModalFrameProps) => {
  const { isOpen, handleClose } = props;
  const tagList = useReactiveVar(hashTagListVar);
  const tagInput = useInput('', tagValidator);

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
