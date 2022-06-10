import * as React from 'react';

import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import { Layout } from './components/Layout';
import Sales from './Pages/Sales';

export const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path='/' element={<Sales />} />
      </Switch>
    </Layout>
  </BrowserRouter>
);
