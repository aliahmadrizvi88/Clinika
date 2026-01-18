import React from 'react';

const patients = [
  { name: 'Tony Anderson', time: '08:00' },
  { name: 'Maria Garcia', time: '09:30' },
  { name: 'James Johnson', time: '10:00' },
];

const MonthlyPatients = () => {
  return (
    <div className="bg-white rounded-2xl p-6">
      <h2 className="font-semibold mb-4">Monthly Reports</h2>

      <ul className="space-y-4">
        {patients.map((p) => (
          <li key={p.name} className="flex justify-between">
            <span>{p.name}</span>
            <span className="text-gray-400">{p.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyPatients;
