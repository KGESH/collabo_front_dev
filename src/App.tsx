import React, { useEffect, useState } from 'react';
import AppRouter from 'components/router/AppRouter';
import Loading from 'components/loading-page/LoadingPage';

const App = () => {
  const [isInit, setIsInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsInit(true);
    setIsLoggedIn(false);
  });

  return (
    <div className='page'>
      {isInit ? <AppRouter isLoggedIn={isLoggedIn} /> : <Loading />}
    </div>
  );
};

export default App;
