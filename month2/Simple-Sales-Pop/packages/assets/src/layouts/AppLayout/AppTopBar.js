import {useStore} from '@assets/reducers/storeReducer';
import '@assets/styles/layout/topbar.scss';
import {TopBar} from '@shopify/polaris';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * @param {boolean} isNavOpen
 * @param {function} toggleOpenNav
 * @return {JSX.Element}
 * @constructor
 */
export default function AppTopBar({isNavOpen, toggleOpenNav}) {
  const {state} = useStore();
  const {shop} = state;

  const userMenuMarkup = <TopBar.UserMenu name="Avada" initials={'A'} />;

  return <TopBar userMenu={userMenuMarkup} />;
}

AppTopBar.propTypes = {
  isNavOpen: PropTypes.bool,
  toggleOpenNav: PropTypes.func
};
