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
    component: Home,
    role: ['admin', 'member']
  },
  {
    url: '/settings',
    component: Settings,
    role: ['admin', 'member']
  },
  {
    url: '/profile',
    component: Profile,
    role: ['admin', 'member']
  },
  {
    url: '/employees',
    component: Employees,
    role: ['admin']
  }
];

const routers = user ? urlEndpoint.filter(({role}) => role.includes(user.role)) : urlEndpoint[0];

// eslint-disable-next-line react/prop-types
const Routes = () => (
  <Switch>
    {user ? (
      routers.map(({url, component}) => <Route key={url} exact path={url} component={component} />)
    ) : (
      <Route path="/" component={Home} />
    )}
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
