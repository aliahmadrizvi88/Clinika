import { User, Calendar, Droplet } from 'lucide-react';

const PatientProfileSection = ({ patient }) => {
  return (
    <div className="flex items-start gap-6 mb-8 pb-8 border-b">
      <div className="w-24 h-24 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
        {patient.first_name?.charAt(0)}
        {patient.last_name?.charAt(0)}
      </div>

      <div className="flex-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {patient.first_name} {patient.last_name}
        </h2>

        <div className="flex gap-4 text-gray-600">
          <span className="flex items-center gap-2">
            <User size={16} />
            {patient.gender || 'N/A'}
          </span>
          <span className="flex items-center gap-2">
            <Calendar size={16} />
            {patient.date_of_birth
              ? new Date(patient.date_of_birth).toLocaleDateString()
              : 'N/A'}
          </span>
          <span className="flex items-center gap-2">
            <Droplet size={16} />
            {patient.blood_group || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileSection;
