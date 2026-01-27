import React, { useEffect } from 'react';
import TopBar from '../../components/Doctor/Dashborad/TopBar';
import WelcomeCard from '../../components/Doctor/Dashborad/WelcomeCard';
import StatsCard from '../../components/Doctor/Dashborad/StatsCard';
import AppointmentsTable from '../../components/Doctor/Dashborad/AppointmentTable';
import MonthlyPatients from '../../components/Doctor/Dashborad/MonthlyTable';

import { useDoctor } from '../../context/Doctor/useDoctor';
import { useAuth } from '../../context/Auth/DoctorAuth/useAuth';

const Dashboard = () => {
  const {
    patients = [],
    appointment = [],
    fetchPatients,
    fetchAppointment,
  } = useDoctor();

  const { doctor } = useAuth();

  useEffect(() => {
    fetchPatients();
    fetchAppointment();
  }, [fetchPatients, fetchAppointment]);

  const statsData = {
    totalPatients: patients.length,
    totalAppointments: appointment.length,
    pendingAppointments: appointment.filter((a) => a.status === 'pending')
      .length,
    completedAppointments: appointment.filter((a) => a.status === 'completed')
      .length,
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <TopBar />

      <WelcomeCard
        doctorName={typeof doctor === 'object' ? doctor.first_name : 'Doctor'}
      />

      <StatsCard stats={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AppointmentsTable />
        <MonthlyPatients />
      </div>
    </div>
  );
};

export default Dashboard;
