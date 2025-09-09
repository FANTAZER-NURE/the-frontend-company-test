import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { ToastProvider } from '@/features/toast/ToastProvider.tsx';
import Toaster from '@/components/Toaster';
import '@radix-ui/themes/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Theme>
        <ToastProvider>
          <App />
          <Toaster />
        </ToastProvider>
      </Theme>
    </BrowserRouter>
  </StrictMode>
);
