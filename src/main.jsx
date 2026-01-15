import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import HospitalProvider from './context/HospitalProvider.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <HospitalProvider>
        <App />
      </HospitalProvider>
    </BrowserRouter>
  </StrictMode>
);
