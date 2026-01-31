import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import UniTable from '../../components/Doctor/UniTable';
import { useDoctor } from '../../context/Doctor/useDoctor';
import { useAuth } from '../../context/Auth/DoctorAuth/useAuth';
import { formatDate, formatDateTime } from '../../util/dateTime';

const Appointment = () => {
  const { appointment = [], fetchAppointment, loading, error } = useDoctor();
  const { token, doctor } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const id = typeof doctor === 'string' ? doctor : doctor?.id || doctor?._id;

  useEffect(() => {
    if (token && id) {
      fetchAppointment();
    }
  }, [token, id, fetchAppointment]);

  // Filter appointments based on search
  const filteredAppointments = appointment.filter((appt) => {
    const patientName = appt.patient_details
      ? `${appt.patient_details.first_name} ${appt.patient_details.last_name}`.toLowerCase()
      : '';
    const reason = (appt.reason_for_visit || '').toLowerCase();
    const status = (appt.status || '').toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      patientName.includes(search) ||
      reason.includes(search) ||
      status.includes(search)
    );
  });

  // Calculate stats
  const totalAppointments = appointment.length;
  const pendingAppointments = appointment.filter(
    (a) => a.status?.toLowerCase() === 'pending',
  ).length;
  const scheduledAppointments = appointment.filter(
    (a) => a.status?.toLowerCase() === 'scheduled',
  ).length;
  const cancelledAppointments = appointment.filter(
    (a) => a.status?.toLowerCase() === 'cancelled',
  ).length;

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[statusLower] || 'bg-gray-100 text-gray-800';
  };

  const columns = [
    {
      key: 'patient_name',
      label: 'Patient Name',
      render: (record) => {
        if (record.patient_details) {
          const name = `${record.patient_details.first_name} ${record.patient_details.last_name}`;
          return (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {record.patient_details.first_name?.charAt(0)}
                {record.patient_details.last_name?.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{name}</p>
                <p className="text-sm text-gray-500">
                  {record.patient_details.phone ||
                    record.patient_details.phone_number ||
                    'No phone'}
                </p>
              </div>
            </div>
          );
        }
        return <span className="text-gray-400">Patient info unavailable</span>;
      },
    },
    {
      key: 'appointment_date',
      label: 'Date',
      render: (record) => (
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" />
          <span>{formatDate(record.appointment_date)}</span>
        </div>
      ),
    },
    {
      key: 'appointment_time',
      label: 'Time',
      render: (record) => (
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          <span>{formatDateTime(record.appointment_time)}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (record) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}
        >
          {record.status}
        </span>
      ),
    },
    {
      key: 'reason_for_visit',
      label: 'Reason',
      render: (record) => (
        <div>
          <p className="text-gray-900">{record.reason_for_visit || 'N/A'}</p>
          {record.duration_minutes && (
            <p className="text-sm text-gray-500">
              {record.duration_minutes} minutes
            </p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="mx-10 my-5">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="font-extrabold text-3xl text-gray-800">Appointments</h1>
        <p className="text-gray-500 mt-1">
          Manage and view all appointments ({filteredAppointments.length} total)
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by patient name, reason, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total</p>
              <p className="text-3xl font-bold text-blue-900 mt-1">
                {totalAppointments}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Calendar className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-yellow-900 mt-1">
                {pendingAppointments}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <AlertCircle className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Scheduled</p>
              <p className="text-3xl font-bold text-green-900 mt-1">
                {scheduledAppointments}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="text-white" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Cancelled</p>
              <p className="text-3xl font-bold text-red-900 mt-1">
                {cancelledAppointments}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <XCircle className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredAppointments.length === 0 && searchTerm && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <Search className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      )}

      {!loading && appointment.length === 0 && !searchTerm && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No appointments yet
          </h3>
          <p className="text-gray-500">
            Appointments will appear here once they are scheduled
          </p>
        </div>
      )}

      {/* Appointments Table */}
      {filteredAppointments.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <UniTable
            columns={columns}
            data={filteredAppointments}
            loading={loading}
            onView={(row) =>
              navigate(`/doctor-side/appointment/${row._id || row.id}`)
            }
          />
        </div>
      )}
    </div>
  );
};

export default Appointment;
