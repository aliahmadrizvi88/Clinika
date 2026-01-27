import React from 'react';
import { Users, CalendarCheck, Clock, CheckCircle } from 'lucide-react';

const StatsCard = ({ stats }) => {
  const cards = [
    {
      label: 'Total Patients',
      value: stats.totalPatients,
      icon: Users,
      color: '#3bbb9c',
    },
    {
      label: 'Appointments',
      value: stats.totalAppointments,
      icon: CalendarCheck,
      color: '#2a89b9',
    },
    {
      label: 'Pending',
      value: stats.pendingAppointments,
      icon: Clock,
      color: '#f59e0b',
    },
    {
      label: 'Completed',
      value: stats.completedAppointments,
      icon: CheckCircle,
      color: '#10b981',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="bg-white rounded-2xl p-5 flex justify-between items-center"
        >
          <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <h2 className="text-2xl font-semibold">{value ?? 0}</h2>
          </div>

          <div
            className="h-12 w-12 rounded-xl flex items-center justify-center text-white"
            style={{ backgroundColor: color }}
          >
            <Icon size={20} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
