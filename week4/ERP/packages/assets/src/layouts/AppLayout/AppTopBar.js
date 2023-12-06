import AppNewsSheet from '@assets/components/AppNews/AppNewsSheet';
import {docLink} from '@assets/config/menuLink';
import {LOGO_URL, LOGO_WIDTH} from '@assets/config/theme';
import isLocal from '@assets/helpers/isLocal';
import useConfirmSheet from '@assets/hooks/popup/useConfirmSheet';
import {useStore} from '@assets/reducers/storeReducer';
import InfoIcon from '@assets/resources/icons/info.svg';
import NotificationIcon from '@assets/resources/icons/notification.svg';
import {isShopUpgradable} from '@assets/services/shopService';
import '@assets/styles/layout/topbar.scss';
import {Button, DisplayText, Icon, Link, Stack, Thumbnail, TopBar} from '@shopify/polaris';
import {
  BugMajor,
  ExitMajor,
  MobileCancelMajor,
  MobileHamburgerMajor,
  PaymentsMajor,
  ProfileMajor
} from '@shopify/polaris-icons';
import PropTypes from 'prop-types';
import React, {useCallback, useState} from 'react';
import {logout} from '../../actions/storeActions';

/**
 * @param {boolean} isNavOpen
 * @param {function} toggleOpenNav
 * @return {JSX.Element}
 * @constructor
 */
export default function AppTopBar({isNavOpen, toggleOpenNav}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const {state, dispatch} = useStore();
  const {shop} = state;

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen(isUserMenuOpen => !isUserMenuOpen),
    []
  );

  const {sheet: newsSheet, openSheet: openNewsSheet} = useConfirmSheet({Content: AppNewsSheet});

  const handleLogout = async () => {
    console.log('logOut');
    await logout(dispatch);
    localStorage.removeItem('user');
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{content: 'My account', icon: ProfileMajor, url: 'profile'}]
        },
        {
          items: [{content: 'Logout', icon: ExitMajor, onAction: handleLogout}]
        }
      ]}
      name={state.user ? state.user.fullName : ''}
      avatar={state.user ? state.user.avatar : 'X'}
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  return (
    <TopBar
      secondaryMenu={
        <div className="Avada-TopBar__Wrapper">
          <div className="Avada-TopBar__Title">
            <Button plain onClick={toggleOpenNav}>
              <Icon source={isNavOpen ? MobileCancelMajor : MobileHamburgerMajor} />
            </Button>
            <img alt="Avada App Name" src={LOGO_URL} width={LOGO_WIDTH} />
            <DisplayText size="small">
              <Link url="/" removeUnderline>
                App Name
              </Link>
            </DisplayText>
            {isLocal && (
              <Stack alignment="center">
                <Button plain url="/dev_zone" icon={BugMajor} />
              </Stack>
            )}
          </div>
          <div className="Avada-TopBar__Icons">
            <Stack alignment="center" spacing="extraTight">
              <Button plain url={docLink} external>
                <Thumbnail source={InfoIcon} size="small" alt="" />
              </Button>
              <Button plain onClick={() => openNewsSheet()}>
                <Thumbnail source={NotificationIcon} size="small" alt="" />
              </Button>
            </Stack>
          </div>
          {isShopUpgradable(shop) && (
            <Button url="/subscription">
              <Stack alignment="center">
                <Icon source={PaymentsMajor} />
                <Stack.Item>Subscription</Stack.Item>
              </Stack>
            </Button>
          )}

          {newsSheet}
        </div>
      }
      userMenu={state.user ? userMenuMarkup : ''}
    />
  );
}

AppTopBar.propTypes = {
  isNavOpen: PropTypes.bool,
  toggleOpenNav: PropTypes.func
};
