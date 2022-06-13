import { Route, Routes } from 'react-router-dom';

import Details from './Details';
import List from './List';

const Pages = () => {
  return (
    <>
      <h1>Sales Module</h1>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/detalhes' element={<Details />} />
      </Routes>
    </>
  );
};

export default Pages;
