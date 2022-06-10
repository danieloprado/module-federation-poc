import * as React from 'react';

import FallbackHandler from '../../components/FallbackHandler';

const SalesModule = React.lazy(() => import('@my-eduzz/sales'));

const Sales = () => {
  return (
    <FallbackHandler>
      <SalesModule />
    </FallbackHandler>
  );
};

export default Sales;
