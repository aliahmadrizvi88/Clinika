import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DoctorLayout = () => {
  return (
    <div>
      <Sidebar />
      <main className="flex-1 max-h-screen bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;
