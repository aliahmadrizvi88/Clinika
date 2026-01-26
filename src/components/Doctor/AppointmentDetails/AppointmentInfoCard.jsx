import { formatDate, formatTime } from '../../../util/dateTime';
const AppointmentInfoCard = ({ appointment }) => {
  if (!appointment) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
      <h2 className="text-lg font-semibold mb-4">Appointment Information</h2>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <p>
          <strong>Date:</strong> {formatDate(appointment.appointment_date)}
        </p>
        <p>
          <strong>Time:</strong> {formatTime(appointment.appointment_time)}
        </p>
        <p>
          <strong>Status:</strong> {appointment.status}
        </p>
        <p>
          <strong>Reason:</strong> {appointment.reason_for_visit || 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default AppointmentInfoCard;
