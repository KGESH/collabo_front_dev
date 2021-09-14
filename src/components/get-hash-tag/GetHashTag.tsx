import React, { useState, useEffect, useRef } from 'react';
import { GET_HASHTAGS } from 'components/get-hash-tag/HashTagGql';
import { useQuery } from '@apollo/client';
import { hashTagQueryVar } from 'services/apollo-client/LocalState';
import { IHashTag } from 'types/HashTag';

const GetHashTag = () => {
  const { loading, data, error } = useQuery(GET_HASHTAGS, {});

  useEffect(() => {
    if (!loading && data?.getAllHashTag && !error) {
      hashTagQueryVar(
        data.getAllHashTag.map((hashTag: IHashTag, index: number) => {
          return {
            id: hashTag.id,
            name: hashTag.name,
            count: hashTag.count,
          };
        }),
      );
      console.log(data);
      console.log(hashTagQueryVar());
    }
  }, [loading]);

  return <></>;
};

export default GetHashTag;
