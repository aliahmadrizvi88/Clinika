import React from 'react';

const MonthlyPatients = ({
  title = 'Monthly Reports',
  patients = [],
  loading = false,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">{title}</h2>
        <span className="text-sm text-gray-400">
          {patients.length} Patients
        </span>
      </div>

      {/* Loading State */}
      {loading && (
        <ul className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex justify-between">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
            </li>
          ))}
        </ul>
      )}

      {/* Empty State */}
      {!loading && patients.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-8">
          No patient records this month
        </p>
      )}

      {/* Data */}
      {!loading && patients.length > 0 && (
        <ul className="space-y-4">
          {patients.map((p, index) => (
            <li
              key={p._id || index}
              className="flex justify-between items-center border-b last:border-none pb-2"
            >
              <div>
                <p className="font-medium text-sm">
                  {p.name || 'Unnamed Patient'}
                </p>
                {p.reason && (
                  <p className="text-xs text-gray-400">{p.reason}</p>
                )}
              </div>

              <span className="text-gray-400 text-sm">{p.time || '--:--'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MonthlyPatients;
