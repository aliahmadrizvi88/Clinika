import React from 'react';
import { Users, CalendarCheck, Clock, CheckCircle } from 'lucide-react';

const StatsCard = ({ stats = {} }) => {
  const cards = [
    {
      label: 'Total Patients',
      value: stats.totalPatients ?? 0,
      icon: Users,
      gradient: 'from-emerald-50 to-emerald-100',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      iconBg: 'bg-emerald-500',
    },
    {
      label: 'Appointments',
      value: stats.totalAppointments ?? 0,
      icon: CalendarCheck,
      gradient: 'from-blue-50 to-blue-100',
      border: 'border-blue-200',
      text: 'text-blue-700',
      iconBg: 'bg-blue-500',
    },
    {
      label: 'Pending',
      value: stats.pendingAppointments ?? 0,
      icon: Clock,
      gradient: 'from-amber-50 to-amber-100',
      border: 'border-amber-200',
      text: 'text-amber-700',
      iconBg: 'bg-amber-500',
    },
    {
      label: 'Completed',
      value: stats.completedAppointments ?? 0,
      icon: CheckCircle,
      gradient: 'from-teal-50 to-teal-100',
      border: 'border-teal-200',
      text: 'text-teal-700',
      iconBg: 'bg-teal-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map(
        ({ label, value, icon: Icon, gradient, border, text, iconBg }) => (
          <div
            key={label}
            className={`
              bg-linear-to-br ${gradient}
              p-6 rounded-xl border ${border}
              transition hover:shadow-md
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${text}`}>{label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
              </div>

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${iconBg}`}
              >
                <Icon size={22} />
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default StatsCard;
