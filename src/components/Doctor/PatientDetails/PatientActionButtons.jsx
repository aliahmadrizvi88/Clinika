import { Pencil, Trash2, Plus } from 'lucide-react';

const PatientActionButtons = ({ onBack, onEdit, onDelete, onBook }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      <button
        onClick={onBack}
        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        Back to List
      </button>

      <button
        onClick={onEdit}
        className="inline-flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
      >
        <Pencil size={18} />
        Edit Patient
      </button>

      <button
        onClick={onDelete}
        className="inline-flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
      >
        <Trash2 size={18} />
        Delete Patient
      </button>

      <button
        onClick={onBook}
        className="inline-flex items-center gap-2 px-6 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition cursor-pointer"
      >
        <Plus size={18} />
        Book Appointment
      </button>
    </div>
  );
};

export default PatientActionButtons;
