import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Navbar from 'components/navbar/Navbar';
import Error404 from 'components/error-page/Error404';
import AppRoutes from 'components/router/Routes';
import { IRoutes } from 'types/Routes';

const AppRouter = () => (
  <>
    <Switch>
      {AppRoutes.map((route: IRoutes, key: number) => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={key}
        />
      ))}
      <Route component={Error404} />
    </Switch>
    {/* 네브바 ( 네브바를 AppRouter에 위치시킬지 각각의 domain에 위치시킬지 결정됬을 때 주석 해제 (주석처리 21-08-12:유성현)) */}
    {/*<Navbar />*/}
  </>
);

export default AppRouter;
