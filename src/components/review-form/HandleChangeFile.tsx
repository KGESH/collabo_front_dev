import React from 'react';
import {
  uploadImgBase64Var,
  uploadImgVar,
} from 'services/apollo-client/LocalState';

export const handleChangeFile = (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const files = event.target.files as FileList;

  if (files[0]) {
    uploadImgVar(files[0]);
    const reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onloadend = () => uploadImgBase64Var(reader.result?.toString());
  }
};
