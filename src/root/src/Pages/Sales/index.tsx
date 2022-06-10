import * as React from 'react';

import FallbackHandler from '../../components/FallbackHandler';

const SalesModule = React.lazy(() => import('myeduzzsales'));

const Sales = () => {
  return (
    <FallbackHandler>
      <SalesModule />
    </FallbackHandler>
  );
};

export default Sales;
