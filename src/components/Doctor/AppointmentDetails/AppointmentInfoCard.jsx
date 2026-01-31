import { Calendar, Clock, FileText, AlertCircle, Edit } from 'lucide-react';
import { formatDate, formatTime } from '../../../util/dateTime';

const AppointmentInfoCard = ({ appointment }) => {
  if (!appointment) return null;

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-gray-100 text-gray-800 border-gray-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[statusLower] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Appointment Information
        </h2>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
          <Edit size={18} className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
            <Calendar className="text-blue-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Appointment Date</p>
            <p className="text-gray-900 font-medium">
              {formatDate(appointment.appointment_date)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
            <Clock className="text-purple-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Time</p>
            <p className="text-gray-900 font-medium">
              {formatTime(appointment.appointment_time)}
            </p>
            {appointment.duration_minutes && (
              <p className="text-sm text-gray-500 mt-1">
                Duration: {appointment.duration_minutes} minutes
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
            <AlertCircle className="text-green-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(appointment.status)}`}
            >
              {appointment.status}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
            <FileText className="text-orange-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Reason for Visit</p>
            <p className="text-gray-900 font-medium">
              {appointment.reason_for_visit || 'Not specified'}
            </p>
          </div>
        </div>
      </div>

      {appointment.notes && (
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-500 mb-2">Additional Notes</p>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
            {appointment.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentInfoCard;
