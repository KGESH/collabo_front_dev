import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import {
  currentUserVar,
  isLoggedInVar,
} from 'services/apollo-client/LocalState';
import { useQuery } from '@apollo/react-hooks';
import { GET_KAKAO_USER_BY_JWT } from 'services/apollo-client/GetKaKaoUserInfo';
import { IUser } from 'types/User';
import LoadingPage from 'components/loading-page/LoadingPage';

const KakaoCallback = () => {
  const location = useLocation();
  const { jwt } = queryString.parse(location.search);
  if (jwt) {
    localStorage.setItem('jwt', jwt as string);
  }

  const { loading, data, error } = useQuery(GET_KAKAO_USER_BY_JWT, {
    variables: { jwt },
  });

  if (error) {
    console.log(`kakao callback page error`);
    console.log(error);
  }

  useEffect(() => {
    if (!loading) {
      const user: IUser = {
        id: data?.getKakaoUserByJwt.id,
        email: data?.getKakaoUserByJwt.email,
        name: data?.getKakaoUserByJwt.name,
        point: data?.getKakaoUserByJwt.point,
      };
      currentUserVar(user);
      isLoggedInVar(true);
    }
  }, [loading]);

  if (loading) {
    return <LoadingPage />;
  } else {
    return <Redirect to='/' />;
  }
};

export default KakaoCallback;
