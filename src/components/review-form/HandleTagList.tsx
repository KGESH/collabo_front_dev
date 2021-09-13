import React from 'react';
import { hashTagListVar } from 'services/apollo-client/LocalState';

export const handleRemoveTagListItem = (index: number) => {
  const newTagList = [...hashTagListVar()];
  newTagList.splice(index, 1);
  hashTagListVar(newTagList);
};

export const handleAddTag = (tagInput: any) => {
  /** empty string check & only white space check */
  if (tagInput.value.trim()) {
    hashTagListVar([...hashTagListVar(), tagInput.value.trim()]);
    tagInput.clear();
  }
};

export const tagValidator = (value: any) => {
  /**
   * test validator
   * 여기서 입력받을 태그 유효성 검사
   */

  return true;
};
