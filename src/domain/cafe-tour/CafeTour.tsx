import React, { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { currentUserVar } from 'services/apollo-client/LocalState';
/**
 * 지도 뜨는 페이지
 * 카페투어 보다 괜찮은 이름 떠오르면 수정바람
 */

const CafeTour = () => {
  const user = useReactiveVar(currentUserVar);
  useEffect(() => {
    console.log(`call current user`);
    console.log(user);
  }, []);
  return <></>;
};

export default CafeTour;
