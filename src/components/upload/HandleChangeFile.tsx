import React from 'react';
import { uploadImgBase64ListVar, uploadImgListVar } from 'services/apollo-client/LocalState';

export const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  uploadImgBase64ListVar([]);
  uploadImgListVar(null);
  const files = event.target.files as FileList;

  if (files.length) {
    uploadImgListVar(files);

    Array.from(files).forEach((file) => {
      uploadImgBase64ListVar([...uploadImgBase64ListVar(), URL.createObjectURL(file)]);
    });
  }
};
