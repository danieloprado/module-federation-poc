import { useRoutes } from 'react-router-dom';

import List from './List';

const Routes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <List />
    }
  ]);

  return <>{routes}</>;
};

export default Routes;
