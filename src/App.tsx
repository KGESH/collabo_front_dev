import React, { useEffect } from 'react';
import AppRouter from 'components/router/AppRouter';
import Loading from 'components/loading-page/LoadingPage';
import KakaoSdkInit from 'services/kakao/KakaoSdkInit';
import {
  currentUserVar,
  isLoggedInVar,
  isInitVar,
} from 'services/apollo-client/LocalState';
import { useQuery } from '@apollo/react-hooks';
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
  const { loading, data } = useQuery(GET_KAKAO_USER);

  useEffect(() => {
    KakaoSdkInit();
  }, []);

  useEffect(() => {
    if (!user && data?.authUser) {
      const me: IUser = {
        id: data.authUser.id,
        name: data.authUser.name,
        email: data.authUser.email,
        point: data.authUser.point,
      };
      currentUserVar(me);
      isLoggedInVar(true);
    }
    isInitVar(true);
    console.log(isInitVar);
  }, [loading]);

  useEffect(() => {
    console.log(`Login : ${isLoggedIn}`);
    console.log(user);
  }, [user, isLoggedIn]);

  return <>{isInit ? <AppRouter /> : <Loading />}</>;
};

export default App;
