import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from '@assets/loadables/NotFound';
import MainFeed from '@assets/loadables/MainFeed';
import {routePrefix} from '@assets/config/app';
import Settings from '@assets/loadables/MainFeed';

// eslint-disable-next-line react/prop-types
const Routes = ({prefix = routePrefix}) => (
  <Switch>
    <Route exact path={prefix + '/'} component={MainFeed} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
