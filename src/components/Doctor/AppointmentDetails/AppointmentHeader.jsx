import { ArrowLeft } from 'lucide-react';

const AppointmentHeader = ({ onBack }) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <button
        onClick={onBack}
        className="p-2 hover:bg-white rounded-full transition shadow-sm"
      >
        <ArrowLeft size={24} className="text-gray-700" />
      </button>
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800">
          Appointment Details
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          View and manage appointment information
        </p>
      </div>
    </div>
  );
};

export default AppointmentHeader;
