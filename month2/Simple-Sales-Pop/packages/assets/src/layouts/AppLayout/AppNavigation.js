import {prependRoute} from '@assets/config/app';
import {getUrl} from '@assets/helpers/getUrl';
import {useStore} from '@assets/reducers/storeReducer';
import '@assets/styles/layout/navigation.scss';
import {Navigation} from '@shopify/polaris';
import {HomeMajor, NotificationMajor, SettingsMajor} from '@shopify/polaris-icons';
import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';

/**
 * @return {JSX.Element}
 * @constructor
 */
export default function AppNavigation() {
  const history = useHistory();
  const {pathname} = useLocation();
  const {state} = useStore();
  const {shop} = state;

  const isSelected = (route, isExact = true) => {
    if (typeof route === 'undefined') return false;
    const url = prependRoute(route);
    return isExact ? pathname === url : pathname.startsWith(url);
  };

  const prepareMenu = (menu, item) => {
    if (!item) return menu;

    const {subNavigationItems: subMenus, url, path, includeUrl} = item;

    if (!subMenus?.length) {
      menu.push({
        ...item,
        url: url || path,
        selected: isSelected(url) || isSelected(includeUrl) || isSelected(path, false)
      });
      return menu;
    }

    menu.push({
      url: subMenus[0].url,
      ...item,
      selected: isSelected(path || url, !path),
      subNavigationItems: subMenus.map(x => ({
        ...x,
        selected: isSelected(x.url, false) || isSelected(x.includeUrl, false)
      }))
    });
    return menu;
  };

  return (
    <Navigation location="">
      <Navigation.Section
        fill
        separator
        items={[
          {
            url: '/',
            icon: HomeMajor,
            label: 'Home',
            selected: location.pathname === getUrl('/'),
            onClick: () => {
              history.push('/');
            }
          },
          {
            url: '/notifications',
            icon: NotificationMajor,
            label: 'Notifications',
            selected: location.pathname === getUrl('/notifications'),
            onClick: () => {
              history.push('/notifications');
            }
          },
          {
            url: '/settings',
            icon: SettingsMajor,
            label: 'Settings',
            selected: location.pathname === getUrl('/settings'),
            onClick: () => {
              history.push('/settings');
            }
          }
        ].reduce(prepareMenu, [])}
      />
    </Navigation>
  );
}
