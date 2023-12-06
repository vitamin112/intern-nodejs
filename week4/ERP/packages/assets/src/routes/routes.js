import {routePrefix} from '@assets/config/app';
import Employees from '@assets/loadables/Employees/Employees';
import Home from '@assets/loadables/Home';
import NotFound from '@assets/loadables/NotFound';
import Profile from '@assets/loadables/Profile/Profile';
import Samples from '@assets/loadables/Samples/Samples';
import Settings from '@assets/loadables/Settings/Settings';
import React from 'react';
import {Route, Switch} from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Routes = ({prefix = routePrefix}) => (
  <Switch>
    <Route exact path={prefix + '/'} component={Home} />
    <Route exact path={prefix + '/samples'} component={Samples} />
    <Route exact path={prefix + '/settings'} component={Settings} />
    <Route exact path={prefix + '/profile'} component={Profile} />
    <Route exact path={prefix + '/employees'} component={Employees} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
