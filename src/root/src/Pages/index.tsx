import { lazy, memo } from 'react';

import { useRoutes } from 'react-router-dom';

import Dashboard from './Dashboard';

import FallbackHandler from '@/FallbackHandler';

const SalesModule = lazy(() => import('@my-eduzz/sales'));

const Pages = memo(() => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/vendas',
      element: (
        <FallbackHandler>
          <SalesModule />
        </FallbackHandler>
      )
    }
  ]);

  return <>{routes}</>;
});

export default Pages;
