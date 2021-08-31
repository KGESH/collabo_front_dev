import React, { useEffect } from 'react';
import AppRouter from 'components/router/AppRouter';
import Loading from 'components/loading-page/LoadingPage';
import KakaoSdkInit from 'services/kakao/KakaoSdkInit';
import {
  currentUserVar,
  isLoggedInVar,
  isInitVar,
} from 'services/apollo-client/LocalState';
import { useMutation } from '@apollo/client';
import { useReactiveVar } from '@apollo/client';
import { GET_KAKAO_USER } from 'services/apollo-client/GetKaKaoUserInfo';
import { IUser } from 'types/User';

const App = () => {
  /**
   * 앱의 전역에서 사용할 수 있는 상태
   * Apollo Client - Reactive Variables 참조
   * (21-8-16:지성현)
   */

  const isInit = useReactiveVar(isInitVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const user = useReactiveVar(currentUserVar);
  const [getKakaoUser, { loading, data }] = useMutation(GET_KAKAO_USER);

  useEffect(() => {
    KakaoSdkInit();
  }, []);

  useEffect(() => {
    if (!user) {
      console.log(`call kakao user Mutation`);
      getKakaoUser();
    }
  }, []);

  useEffect(() => {
    if (!loading && data?.authUser) {
      const me: IUser = {
        id: data.authUser.id,
        name: data.authUser.name,
        email: data.authUser.email,
        point: data.authUser.point,
        profile_img: data.authUser.profile_img,
      };
      currentUserVar(me);
      isLoggedInVar(true);
    }
    isInitVar(true);
    console.log(`call App useEffect / loading`);
  }, [loading]);

  return <>{isInit ? <AppRouter /> : <Loading />}</>;
};

export default App;
