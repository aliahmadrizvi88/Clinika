import React from 'react';
import Nav from '../components/Patients/Nav';
import Footer from '../components/Patients/Footer';
import { Outlet } from 'react-router-dom';

const PatientLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default PatientLayout;
