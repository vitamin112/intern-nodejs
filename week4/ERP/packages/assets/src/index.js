import {StoreProvider} from '@assets/reducers/storeReducer';
import React from 'react';
import * as ReactDOM from 'react-dom';
import 'whatwg-fetch';
import App from './App';
import {auth} from './helpers';
import * as serviceWorker from './serviceWorker';
import './styles/app.scss';

const isProduction = process.env.NODE_ENV === 'production';

window.isAuthenticated = false;

auth.onAuthStateChanged(async function(user) {
  ReactDOM.render(
    <StoreProvider>
      <App />
    </StoreProvider>,
    document.getElementById('app')
  );
});

if (isProduction) {
  serviceWorker.register();
}

if (module.hot) module.hot.accept();
