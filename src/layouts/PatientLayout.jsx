import React from 'react';
import Nav from '../components/Patients/Nav';
import { Outlet } from 'react-router-dom';

const PatientLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default PatientLayout;
