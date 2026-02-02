import React from 'react';
import { Edit, CheckCircle, XCircle, Calendar, Trash2 } from 'lucide-react';

const AppointmentActions = ({
  appointment,
  onEdit,
  onComplete,
  onCancel,
  onReschedule,
}) => {
  const isScheduled = appointment.status === 'Scheduled';
  const isCancelled = appointment.status === 'Cancelled';
  const isCompleted = appointment.status === 'Completed';

  return (
    <div className="sticky top-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Actions</h3>

      <div className="space-y-3">
        {/* Edit Button */}
        <button
          onClick={onEdit}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Edit size={18} />
          Edit Appointment
        </button>

        {/* Complete Button - Only for Scheduled appointments */}
        {isScheduled && (
          <button
            onClick={onComplete}
            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle size={18} />
            Mark as Complete
          </button>
        )}

        {/* Cancel Button - Only for non-cancelled and non-completed */}
        {!isCancelled && !isCompleted && (
          <button
            onClick={onCancel}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-gray-50 transition cursor-pointer"
          >
            <XCircle size={18} />
            Cancel Appointment
          </button>
        )}

        {/* Reschedule Button */}
        {!isCancelled && !isCompleted && (
          <button
            onClick={onReschedule}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-purple-500 text-purple-500 rounded-lg hover:bg-gray-50 transition cursor-pointer"
          >
            <Calendar size={18} />
            Reschedule
          </button>
        )}
      </div>

      {/* Status Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <p className="mb-2">
            <span className="font-medium">Status:</span>{' '}
            <span
              className={`font-semibold ${
                isCompleted
                  ? 'text-green-600'
                  : isCancelled
                    ? 'text-red-600'
                    : 'text-blue-600'
              }`}
            >
              {appointment.status}
            </span>
          </p>
          <p className="mb-2">
            <span className="font-medium">Duration:</span>{' '}
            {appointment.duration_minutes} minutes
          </p>
          {appointment.created_at && (
            <p className="text-xs text-gray-500 mt-3">
              Created: {new Date(appointment.created_at).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentActions;
