import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Toaster } from 'sonner';

import App from './components/app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster richColors position='top-center' />
    </Provider>
  </StrictMode>,
);