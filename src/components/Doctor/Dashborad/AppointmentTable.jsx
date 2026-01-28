import React from 'react';
import { Check, X, Clock, Ban } from 'lucide-react';
import { useDoctor } from '../../../context/Doctor/useDoctor';
import { formatDate } from '../../../util/dateTime';

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

const AppointmentsTable = () => {
  const { appointment = [], loading } = useDoctor();

  return (
    <div className="bg-white rounded-2xl p-6 col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">My Appointments</h2>
        <span className="text-sm text-gray-400">
          {appointment.length} total
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 bg-gray-200 rounded" />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && appointment.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-10">
          No appointments available
        </p>
      )}

      {/* Table */}
      {!loading && appointment.length > 0 && (
        <table className="w-full text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="text-left py-2">Patient</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {appointment.slice(0, 5).map((a) => {
              const statusKey = a.status?.toLowerCase() || 'scheduled';
              const status =
                STATUS_CONFIG[statusKey] || STATUS_CONFIG.scheduled;
              const Icon = status.icon;

              return (
                <tr
                  key={a._id}
                  className="text-center hover:bg-[#f6f8fc] transition"
                >
                  <td className="py-3 text-left font-medium">
                    {a.patient_details
                      ? `${a.patient_details.first_name} ${a.patient_details.last_name}`
                      : 'Unknown'}
                  </td>

                  <td>
                    {a.patient_details?.phone ||
                      a.patient_details?.phone_number ||
                      '—'}
                  </td>

                  <td>{formatDate(a.appointment_date)}</td>

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
      )}
    </div>
  );
};

export default AppointmentsTable;
