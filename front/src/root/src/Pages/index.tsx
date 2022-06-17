import { lazy, memo } from 'react';

import { Route, Routes } from 'react-router-dom';

import Dashboard from './Dashboard';

import FallbackHandler from '@/FallbackHandler';

const SalesModule = lazy(() => import('@my-eduzz/sales'));
const ProductsModule = lazy(() => import('@my-eduzz/products'));

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
      <Route
        path='/produtos/*'
        element={
          <FallbackHandler>
            <ProductsModule />
          </FallbackHandler>
        }
      />
    </Routes>
  );
});

export default Pages;
