import React from 'react';
import { Check, X, Clock, Ban } from 'lucide-react';

const STATUS_CONFIG = {
  scheduled: {
    label: 'Scheduled',
    icon: Clock,
    className: 'bg-blue-100 text-blue-600',
  },
  completed: {
    label: 'Completed',
    icon: Check,
    className: 'bg-[#3bbb9c]/10 text-[#3bbb9c]',
  },
  cancelled: {
    label: 'Cancelled',
    icon: Ban,
    className: 'bg-red-100 text-red-600',
  },
  'no-show': {
    label: 'No Show',
    icon: X,
    className: 'bg-gray-200 text-gray-600',
  },
};

const appointments = [
  {
    name: 'David Laid',
    location: 'New York',
    date: '25 Jun 2024',
    time: '01:00 PM',
    status: 'scheduled',
  },
  {
    name: 'Shopie Rose',
    location: 'Downtown',
    date: '24 Jun 2024',
    time: '05:00 PM',
    status: 'completed',
  },
];

const AppointmentsTable = () => {
  return (
    <div className="bg-white rounded-2xl p-6 col-span-2">
      <h2 className="font-semibold mb-4">My Appointments</h2>

      <table className="w-full text-sm">
        <thead className="text-gray-400">
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a, i) => {
            const status = STATUS_CONFIG[a.status];
            const Icon = status.icon;

            return (
              <tr
                key={i}
                className="text-center hover:bg-[#f6f8fc] hover:scale-[1.01] transition duration-150"
              >
                <td className="py-3">{a.name}</td>
                <td>{a.location}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.className}`}
                  >
                    <Icon size={14} />
                    {status.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsTable;
