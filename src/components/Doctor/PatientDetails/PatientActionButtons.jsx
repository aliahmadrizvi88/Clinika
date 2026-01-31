import { ArrowLeft, Pencil, Trash2, Calendar } from 'lucide-react';

const PatientActionButtons = ({ onBack, onEdit, onDelete, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Quick Actions
      </h3>

      <div className="space-y-3">
        <button
          onClick={onBook}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow-lg hover:shadow-xl"
        >
          <Calendar size={20} />
          Book Appointment
        </button>

        <button
          onClick={onEdit}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          <Pencil size={18} />
          Edit Patient
        </button>

        <button
          onClick={onDelete}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
        >
          <Trash2 size={18} />
          Delete Patient
        </button>

        <button
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          <ArrowLeft size={18} />
          Back to List
        </button>
      </div>

      {/* Patient ID */}
      <div className="mt-6 pt-6 border-t">
        <p className="text-sm text-gray-500 mb-1">Patient ID</p>
        <p className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
          {onEdit._id?.slice(-12) || 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default PatientActionButtons;
