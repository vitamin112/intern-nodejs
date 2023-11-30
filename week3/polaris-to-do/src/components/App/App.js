import {AppProvider} from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import en from '@shopify/polaris/locales/en.json';
import '../../index.css';
import Header from '../Header/Header';
import TodoList from '../TodoList/TodoList';

const theme = {
  colors: {
    topBar: {
      background: '#fff',
      border: '#C4CDD5',
      color: '#000000',
    },
    primary: '#008060',
    critical: '#D82C0D',
  },

  logo: {
    width: 124,
    topBarSource: '/images/logo.png',
    url: '/',
    accessibilityLabel: 'Logo',
  },
};

function App() {
  return (
    <AppProvider theme={theme} i18n={en}>
      <Header />
      <TodoList />
    </AppProvider>
  );
}
export default App;
