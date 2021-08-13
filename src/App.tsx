import React, { useEffect, useState } from 'react';
import AppRouter from 'components/router/AppRouter';
import Loading from 'components/loading-page/LoadingPage';
import KakaoSdkInit from 'services/kakao/KakaoSdkInit';
const App = () => {
  const [isInit, setIsInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    KakaoSdkInit();
  }, []);
  useEffect(() => {
    setIsLoggedIn(false);
    setIsInit(true);
  });

  return <>{isInit ? <AppRouter isLoggedIn={isLoggedIn} /> : <Loading />}</>;
};

export default App;
