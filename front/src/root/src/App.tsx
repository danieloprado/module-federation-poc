import { setup } from '@my-eduzz/shared/front';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import ThemeProvider from '@eduzz/houston-ui/ThemeProvider';

import Pages from './Pages';

import theme from '@/assets/theme';
import Layout from '@/Layout';

setup('');

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Layout>
        <Pages />
      </Layout>
    </BrowserRouter>
  </ThemeProvider>
);

const container = document.getElementById('app');
const root = createRoot(container as HTMLElement);
root.render(<App />);
