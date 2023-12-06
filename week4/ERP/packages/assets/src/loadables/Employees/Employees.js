import Loading from '@assets/components/Loading';
import Loadable from 'react-loadable';

// eslint-disable-next-line new-cap
export default Loadable({
  loader: () => import('../../pages/Employees/Employees'),
  loading: Loading
});
