import React from 'react';
import TopBar from '../../components/Doctor/Dashborad/TopBar';
import WelcomeCard from '../../components/Doctor/Dashborad/WelcomeCard';
import StatsCard from '../../components/Doctor/Dashborad/StatsCard';
import AppointmentsTable from '../../components/Doctor/Dashborad/AppointmentTable';
import MonthlyPatients from '../../components/Doctor/Dashborad/MonthlyTable';

const Dashboard = () => {
  return (
    <div className="flex-1 p-6 space-y-6">
      <TopBar />
      <WelcomeCard />
      <StatsCard />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AppointmentsTable />
        <MonthlyPatients />
      </div>
    </div>
  );
};

export default Dashboard;
