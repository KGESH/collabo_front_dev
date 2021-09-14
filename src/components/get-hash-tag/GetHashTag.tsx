import React, { useState, useEffect, useRef } from 'react';
import { GET_HASHTAGS } from 'components/get-hash-tag/HashTagGql';
import { useQuery } from '@apollo/client';
import { hashTagListVar } from 'services/apollo-client/LocalState';

const GetHashTag = () => {
  const { loading, data, error } = useQuery(GET_HASHTAGS, {});

  useEffect(() => {
    if (!loading && data && !error) {
      hashTagListVar(data.getAllHashTag);
      console.log(data);
      console.log(hashTagListVar());
    }
  }, [loading]);

  return <></>;
};

export default GetHashTag;
