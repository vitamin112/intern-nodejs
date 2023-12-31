import {closeToast} from '@assets/actions/storeActions';
import Footer from '@assets/components/Footer/Footer';
import AppNavigation from '@assets/layouts/AppLayout/AppNavigation';
import AppTopBar from '@assets/layouts/AppLayout/AppTopBar';
import {useStore} from '@assets/reducers/storeReducer';
import {Frame, Layout, Loading, Scrollable, Toast} from '@shopify/polaris';
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

  const [isNavOpen, setIsNavOpen] = useState(false);
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
        <Scrollable className={contentClass.join(' ')}>
          {children}
          <Layout>
            <Footer />
          </Layout>
        </Scrollable>
      </div>
      {loading && <Loading />}
      {toast && <Toast onDismiss={() => closeToast(dispatch)} {...toast} />}
    </Frame>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
};
