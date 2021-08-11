import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Navbar from 'components/navbar/Navbar';
import Error404 from 'components/error-page/Error404';
import AppRoutes from 'components/router/Routes';
import type { HomeProps } from 'types/Props';

const AppRouter = ({ isLoggedIn }: HomeProps) => (
  <>
    <Switch>
      {AppRoutes.map((route, key) => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={key}
        />
      ))}
      <Route component={Error404} />
    </Switch>
    {/*<Navbar />*/}
  </>
);

export default AppRouter;
