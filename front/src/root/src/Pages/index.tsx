import { lazy, memo } from 'react';

import { Route, Routes } from 'react-router-dom';

import Dashboard from './Dashboard';

import FallbackHandler from '@/FallbackHandler';

const SalesModule = lazy(() => new Promise(resolve => setTimeout(() => resolve(import('@my-eduzz/sales')), 3000)));

const Pages = memo(() => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route
        path='/vendas/*'
        element={
          <FallbackHandler>
            <SalesModule />
          </FallbackHandler>
        }
      />
    </Routes>
  );
});

export default Pages;
