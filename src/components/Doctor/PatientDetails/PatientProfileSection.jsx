import { User, Calendar, Droplet } from 'lucide-react';

const PatientProfileSection = ({ patient }) => {
  return (
    <div className="flex items-start gap-6 mb-8 pb-8 border-b">
      <div className="w-24 h-24 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
        {patient.first_name?.charAt(0)}
        {patient.last_name?.charAt(0)}
      </div>

      <div className="flex-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          {patient.first_name} {patient.last_name}
        </h2>

        <div className="flex flex-wrap gap-3">
          {patient.gender && (
            <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              <User size={14} />
              {patient.gender}
            </span>
          )}
          {patient.date_of_birth && (
            <span className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              <Calendar size={14} />
              {new Date(patient.date_of_birth).toLocaleDateString()}
            </span>
          )}
          {patient.blood_group && (
            <span className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              <Droplet size={14} />
              {patient.blood_group}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfileSection;
