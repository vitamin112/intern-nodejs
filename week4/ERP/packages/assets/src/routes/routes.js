import Employees from '@assets/loadables/Employees/Employees';
import Home from '@assets/loadables/Home';
import NotFound from '@assets/loadables/NotFound';
import Profile from '@assets/loadables/Profile/Profile';
import Settings from '@assets/loadables/Settings/Settings';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {getStorageData} from '../helpers/storage';

const user = getStorageData('user');
const urlEndpoint = [
  {
    url: '/',
    component: Home
  },
  {
    url: '/settings',
    component: Settings
  },
  {
    url: '/profile',
    component: Profile
  },
  {
    url: '/employees',
    component: Employees
  }
];

const permission = urlEndpoint.filter(({url}) => user.permissions.includes(url));

// eslint-disable-next-line react/prop-types
const Routes = () => (
  <Switch>
    {permission.map(({url, component}) => (
      <Route key={url} exact path={url} component={component} />
    ))}
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
