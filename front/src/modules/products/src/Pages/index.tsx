import useIsAutheticated from '@my-eduzz/shared/front/hooks/useIsAutheticated';
import { Route, Routes } from 'react-router-dom';

import Details from './Details';
import List from './List';

const Pages = () => {
  const isAutheticated = useIsAutheticated();

  return (
    <>
      <h1>Products Module {isAutheticated ? 'S' : 'N'}</h1>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/detalhes' element={<Details />} />
      </Routes>
    </>
  );
};

export default Pages;
