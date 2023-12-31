import {prependRoute} from '@assets/config/app';
import {getUrl} from '@assets/helpers/getUrl';
import '@assets/styles/layout/navigation.scss';
import {Navigation} from '@shopify/polaris';
import {HomeMajor, ListMajor, SettingsMajor, ShareMinor} from '@shopify/polaris-icons';
import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {getStorageData} from '../../helpers/storage';

/**
 * @return {JSX.Element}
 * @constructor
 */
export default function AppNavigation() {
  const user = getStorageData('user');
  const history = useHistory();
  const {pathname} = useLocation();

  const isSelected = (route, isExact = true) => {
    if (typeof route === 'undefined') return false;
    const url = prependRoute(route);
    return isExact ? pathname === url : pathname.startsWith(url);
  };

  const prepareMenu = (menu, item) => {
    if (!item) return menu;
    if (!item.role.includes(user.role)) return menu;

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
            label: 'Dashboard',
            role: ['admin', 'member'],
            selected: location.pathname === getUrl('/'),
            onClick: () => {
              history.push('/');
            }
          },
          {
            url: '/employees',
            icon: ListMajor,
            label: 'Employees',
            role: ['admin'],
            selected: location.pathname === getUrl('/employees'),
            onClick: () => {
              history.push('/employees');
            }
          },
          {
            url: '/samples',
            icon: ShareMinor,
            label: 'Contact',
            role: ['admin', 'member'],
            selected: location.pathname === getUrl('/samples'),
            onClick: () => {
              history.push('/samples');
            }
          }
        ].reduce(prepareMenu, [])}
      />
      <Navigation.Section
        separator
        items={[
          {
            label: 'Settings',
            url: '/settings',
            role: ['admin', 'member'],
            icon: SettingsMajor
          }
        ].reduce(prepareMenu, [])}
      />
    </Navigation>
  );
}
