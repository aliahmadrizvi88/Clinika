import React from 'react';

const appointments = [
  {
    name: 'David Laid',
    location: 'New York',
    date: '25 Jun 2024',
    time: '01:00 PM',
    status: 'Pending',
  },
  {
    name: 'Shopie Rose',
    location: 'Downtown',
    date: '24 Jun 2024',
    time: '05:00 PM',
    status: 'Completed',
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
          {appointments.map((a, i) => (
            <tr
              key={i}
              className="text-center hover:bg-[#f6f8fc] hover:scale-105 duration-150 transition"
            >
              <td className="py-3">{a.name}</td>
              <td>{a.location}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    a.status === 'Completed'
                      ? 'bg-[#3bbb9c]/10 text-[#3bbb9c]'
                      : 'bg-orange-100 text-orange-600'
                  }`}
                >
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsTable;
