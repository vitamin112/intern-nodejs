import {storeTypes} from '@assets/actions/storeActions';
import ErrorBoundary from '@assets/components/ErrorBoundary';
import ReactRouterLink from '@assets/components/ReactRouterLink';
import theme from '@assets/config/theme';
import {history} from '@assets/history';
import AppLayout from '@assets/layouts/AppLayout';
import {useStore} from '@assets/reducers/storeReducer';
import {AppProvider} from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Router, withRouter} from 'react-router-dom';
import {getStorageData} from './helpers/storage';
import Routes from './routes/routes';

/**
 * The main endpoint of application contains all routes, settings for redux and Polaris
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function App() {
  const {dispatch} = useStore();

  const user = getStorageData('user');

  if (!user || !user.status || !user.role) {
    window.location.href = '/auth/login';
  }

  useEffect(() => {
    dispatch(storeTypes.SET_USER, user);
  }, []);

  return (
    <AppProvider
      theme={theme}
      i18n={translations}
      linkComponent={ReactRouterLink}
      features={{newDesignLanguage: false}}
    >
      <Router history={history}>
        <MainLayout>
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </MainLayout>
      </Router>
    </AppProvider>
  );
}

const AppFullLayout = withRouter(({children}) => <AppLayout>{children}</AppLayout>);

const MainLayout = ({children}) => {
  return <AppFullLayout>{children}</AppFullLayout>;
};

MainLayout.propTypes = {
  children: PropTypes.node
};
