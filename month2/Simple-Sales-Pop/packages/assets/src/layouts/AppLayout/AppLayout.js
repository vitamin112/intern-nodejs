import {closeToast} from '@assets/actions/storeActions';
import {isEmbeddedApp} from '@assets/config/app';
import AppNavigation from '@assets/layouts/AppLayout/AppNavigation';
import AppTopBar from '@assets/layouts/AppLayout/AppTopBar';
import {useStore} from '@assets/reducers/storeReducer';
import {Frame, Loading, Scrollable, Toast} from '@shopify/polaris';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

/**
 * Render an app layout
 *
 * @param {React.ReactNode} children
 * @return {React.ReactNode}
 * @constructor
 */
export default function AppLayout({children}) {
  const {state, dispatch} = useStore();
  const {loading, toast} = state;

  const [isNavOpen, setIsNavOpen] = useState(!isEmbeddedApp);
  const toggleOpenNav = () => setIsNavOpen(prev => !prev);

  const navigationClass = [
    'Avada-ScrollBar--isSubdued',
    'Avada-Frame__Navigation',
    isNavOpen && 'Avada-Frame__Navigation--isExpanded'
  ].filter(Boolean);

  const contentClass = [
    'Avada-Frame__Content',
    isNavOpen && 'Avada-Frame__Content--isExpanded'
  ].filter(Boolean);

  return (
    <Frame topBar={<AppTopBar {...{isNavOpen, toggleOpenNav}} />}>
      <div className="Avada-Frame">
        <div className={navigationClass.join(' ')}>
          <AppNavigation />
        </div>
        <Scrollable className={contentClass.join(' ')}>{children}</Scrollable>
      </div>
      {loading && <Loading />}
      {toast && <Toast onDismiss={() => closeToast(dispatch)} {...toast} />}
    </Frame>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
};
