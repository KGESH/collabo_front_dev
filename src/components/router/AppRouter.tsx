import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Error404 from 'components/error-page/Error404';
import AppRoutes from 'components/router/Routes';
import { IRoutes } from 'types/Routes';

const AppRouter = () => (
  <>
    <Switch>
      {AppRoutes.map((route: IRoutes, key: number) => (
        <Route path={route.path} exact={route.exact} component={route.component} key={key} />
      ))}
      <Route component={Error404} />
    </Switch>
  </>
);

export default AppRouter;
