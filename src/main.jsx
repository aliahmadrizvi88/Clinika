import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import HospitalProvider from './context/HospitalProvider.jsx';
import AuthProvider from './context/Auth/DoctorAuth/AuthProvider.jsx';
import DoctorProvider from './context/Doctor/DoctorProvider.jsx';

import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DoctorProvider>
          <HospitalProvider>
            <App />
          </HospitalProvider>
        </DoctorProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
