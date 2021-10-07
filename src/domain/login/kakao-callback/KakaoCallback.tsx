import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { currentUserVar, isLoggedInVar } from 'services/apollo-client/LocalState';
import { useMutation } from '@apollo/client';
import { GET_KAKAO_USER_BY_JWT } from 'services/apollo-client/GetKaKaoUserInfo';
import { IUser } from 'types/User';
import LoadingPage from 'components/loading-page/LoadingPage';

const KakaoCallback = () => {
  const location = useLocation();
  const { jwt } = queryString.parse(location.search);
  const [getKakaoUser, { data, loading, error }] = useMutation(GET_KAKAO_USER_BY_JWT);
  if (jwt) {
    localStorage.setItem('jwt', jwt as string);
    getKakaoUser({ variables: { jwt } });
  }

  if (error) {
    console.log(`kakao callback page error`);
    console.log(error);
  }

  useEffect(() => {
    if (!loading && data) {
      console.log(data);
      const user: IUser = {
        id: data.getKakaoUserByJwt.user.id,
        nickname: data.getKakaoUserByJwt.user.nickname,
        email: data.getKakaoUserByJwt.user.email,
        name: data.getKakaoUserByJwt.user.name,
        point: data.getKakaoUserByJwt.user.point,
        profile_img: data.getKakaoUserByJwt.user.profile_img,
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
