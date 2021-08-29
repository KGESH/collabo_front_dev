import React, { useState } from 'react';
import Modal from 'components/modal-frame/Modal';
import { IModalFrameProps } from 'types/Props';
import { useInput } from 'hooks/useInput';

const tagValidator = (value: any) => {
  /**
   * test validator
   * 여기서 입력받을 태그 유효성 검사
   */
  return true;
};

const HashTagModal = (props: IModalFrameProps) => {
  const { isOpen, handleClose } = props;
  const [tagList, setTagList] = useState<string[]>([]);
  const tagInput = useInput('', tagValidator);

  const handleAddTag = () => {
    setTagList([...tagList, tagInput.value]);
    tagInput.clear();
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} header='해시태그 추가'>
      <input
        className='modal_hash_tag_input'
        placeholder='태그 입력'
        value={tagInput.value}
        onChange={tagInput.onChange}
      />
      <button className='modal_hash_tag_add_button' onClick={handleAddTag}>
        +
      </button>
      <div>
        {tagList.map((tag) => {
          return (
            <>
              <span>{tag}</span>
              <button>-</button>
            </>
          );
        })}
      </div>
    </Modal>
  );
};

export default HashTagModal;
