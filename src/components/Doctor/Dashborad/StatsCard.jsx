import React from 'react';
import { Users, Phone, CalendarCheck, Mail } from 'lucide-react';

const stats = [
  { label: 'Total Patients', value: 580, icon: Users, color: '#3bbb9c' },
  { label: 'Phone Calls', value: 356, icon: Phone, color: '#37a2ad' },
  { label: 'Appointments', value: 288, icon: CalendarCheck, color: '#2a89b9' },
  { label: 'Unread Mails', value: 5, icon: Mail, color: '#888' },
];

const StatsCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="bg-white rounded-2xl p-5 flex justify-between items-center"
        >
          <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <h2 className="text-2xl font-semibold">{value}</h2>
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
