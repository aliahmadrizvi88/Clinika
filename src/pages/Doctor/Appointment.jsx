import React, { useEffect } from 'react';
import UniTable from '../../components/Doctor/UniTable';
import { useDoctor } from '../../context/Doctor/useDoctor';
import { useAuth } from '../../context/Auth/DoctorAuth/useAuth';
import { formatDate, formatTime } from '../../util/dateTime';

const Appointment = () => {
  const { appointment = [], fetchAppointment, loading, error } = useDoctor();

  const { token, doctor } = useAuth();
  const id = typeof doctor === 'string' ? doctor : doctor?.id || doctor?._id;

  useEffect(() => {
    if (token && id) {
      fetchAppointment();
    }
  }, [token, id, fetchAppointment]);

  return (
    <div className="mx-10 my-5">
      <h1 className="font-extrabold text-2xl mb-5">
        All Appointments ({appointment.length})
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && appointment.length === 0 && !error && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          No appointments found.
        </div>
      )}

      <UniTable
        columns={[
          {
            key: 'appointment_date',
            label: 'Date',
            render: (record) => formatDate(record.appointment_date),
          },
          {
            key: 'appointment_time',
            label: 'Time',
            render: (record) => formatTime(record.appointment_time),
          },
          { key: 'status', label: 'Status' },
          { key: 'reason_for_visit', label: 'Reason' },
        ]}
        data={appointment}
        loading={loading}
      />
    </div>
  );
};

export default Appointment;
