import { ArrowLeft } from 'lucide-react';

const AppointmentHeader = ({ onBack }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
        <ArrowLeft size={22} />
      </button>
      <h1 className="text-2xl font-extrabold">Appointment Details</h1>
    </div>
  );
};

export default AppointmentHeader;
