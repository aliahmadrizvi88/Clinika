import { CheckCircle, XCircle, Calendar, FileText, Edit } from 'lucide-react';

const AppointmentActions = ({
  appointment,
  onComplete,
  onCancel,
  onReschedule,
  onAddMedicalRecord,
}) => {
  const isCompleted = appointment.status?.toLowerCase() === 'completed';
  const isCancelled = appointment.status?.toLowerCase() === 'cancelled';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Quick Actions
      </h3>

      <div className="space-y-3">
        {!isCompleted && !isCancelled && (
          <>
            <button
              onClick={onComplete}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-lg hover:shadow-xl"
            >
              <CheckCircle size={20} />
              Complete Appointment
            </button>

            <button
              onClick={onAddMedicalRecord}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow-lg hover:shadow-xl"
            >
              <FileText size={20} />
              Add Medical Record
            </button>

            <button
              onClick={onReschedule}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              <Calendar size={20} />
              Reschedule
            </button>

            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              <Edit size={20} />
              Edit Details
            </button>

            <button
              onClick={onCancel}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              <XCircle size={20} />
              Cancel Appointment
            </button>
          </>
        )}

        {isCompleted && (
          <div className="text-center py-6">
            <CheckCircle size={48} className="mx-auto text-green-500 mb-3" />
            <p className="text-green-600 font-semibold">
              Appointment Completed
            </p>
          </div>
        )}

        {isCancelled && (
          <div className="text-center py-6">
            <XCircle size={48} className="mx-auto text-red-500 mb-3" />
            <p className="text-red-600 font-semibold">Appointment Cancelled</p>
          </div>
        )}
      </div>

      {/* Appointment Summary */}
      <div className="mt-6 pt-6 border-t space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Appointment ID</span>
          <span className="text-gray-900 font-mono text-xs">
            {appointment._id?.slice(-8) || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Created</span>
          <span className="text-gray-900">
            {new Date(appointment.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentActions;
