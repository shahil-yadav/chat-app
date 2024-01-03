import React from 'react';
import ReactDOM from 'react-dom/client';
import { AccountProvider } from './context/AccountProvider.tsx';
import { TanstackProvider } from './lib/tanstack/Config.tsx';
import { BrowserRouter } from 'react-router-dom';
TanstackProvider;

import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* This => React.StrictMode caused double rendering which caused useEffect to run twice */}
    <BrowserRouter>
      <TanstackProvider>
        <AccountProvider>
          <App />
        </AccountProvider>
      </TanstackProvider>
    </BrowserRouter>
  </React.StrictMode>
);
