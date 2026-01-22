import React, { useEffect } from 'react';
import UniTable from '../../components/Doctor/UniTable';
import { useDoctor } from '../../context/Doctor/useDoctor';
import { useAuth } from '../../context/Auth/DoctorAuth/useAuth';

const Appointment = () => {
  const { appointment, fetchAppointment, loading, error } = useDoctor();
  const { token, doctor } = useAuth();
  const id = typeof doctor === 'string' ? doctor : doctor?.id || doctor?._id;

  useEffect(() => {
    if (token && id) {
      fetchAppointment();
    }
  }, [token, id]);

  const appointmentColumns = [
    {
      key: 'patient_name',
      label: 'Patient Name',
      render: (record) => {
        if (record.patient_details) {
          const firstName = record.patient_details.first_name || '';
          const lastName = record.patient_details.last_name || '';
          return `${firstName} ${lastName}`.trim() || 'N/A';
        }
        return record.patient_id || 'N/A';
      },
    },
    {
      key: 'patient_phone',
      label: 'Phone',
      render: (record) => {
        if (record.patient_details) {
          return (
            record.patient_details.phone ||
            record.patient_details.phone_number ||
            'N/A'
          );
        }
        return 'N/A';
      },
    },
    {
      key: 'appointment_date',
      label: 'Date',
      render: (record) => {
        const date = record.appointment_date;
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      },
    },
    {
      key: 'appointment_time',
      label: 'Time',
      render: (record) => {
        const time = record.appointment_time;
        if (!time) return 'N/A';
        return new Date(time).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
    {
      key: 'duration_minutes',
      label: 'Duration (min)',
      render: (record) => {
        return record.duration_minutes || 'N/A';
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (record) => {
        const status = record.status || 'pending';
        const statusColors = {
          scheduled: 'bg-blue-100 text-blue-800',
          pending: 'bg-yellow-100 text-yellow-800',
          confirmed: 'bg-green-100 text-green-800',
          completed: 'bg-gray-100 text-gray-800',
          cancelled: 'bg-red-100 text-red-800',
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      key: 'reason_for_visit',
      label: 'Reason',
      render: (record) => {
        return record.reason_for_visit || 'N/A';
      },
    },
  ];

  const actions = [
    { label: 'View Details', onClick: (row) => console.log('View', row) },
    { label: 'Reschedule', onClick: (row) => console.log('Reschedule', row) },
    { label: 'Cancel', onClick: (row) => console.log('Cancel', row) },
  ];

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
        columns={appointmentColumns}
        data={appointment}
        loading={loading}
        actions={actions}
      />
    </div>
  );
};

export default Appointment;
