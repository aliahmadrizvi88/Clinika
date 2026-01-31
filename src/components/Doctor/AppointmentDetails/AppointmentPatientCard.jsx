import { User, Phone, Mail, Droplet, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppointmentPatientCard = ({ patient }) => {
  const navigate = useNavigate();

  if (!patient) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Patient Information
        </h2>
        <button
          onClick={() =>
            navigate(`/doctor-side/list/${patient._id || patient.id}`)
          }
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View Full Profile →
        </button>
      </div>

      <div className="flex items-start gap-6 mb-6">
        <div className="w-20 h-20 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
          {patient.first_name?.charAt(0)}
          {patient.last_name?.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {patient.first_name} {patient.last_name}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {patient.gender && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {patient.gender}
              </span>
            )}
            {patient.blood_group && (
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                {patient.blood_group}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Phone className="text-green-600" size={18} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-gray-900 font-medium">
              {patient.phone || patient.phone_number || 'Not provided'}
            </p>
          </div>
        </div>

        {patient.email && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="text-blue-600" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900 font-medium">{patient.email}</p>
            </div>
          </div>
        )}

        {patient.date_of_birth && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-purple-600" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="text-gray-900 font-medium">
                {new Date(patient.date_of_birth).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {patient.address && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <MapPin className="text-orange-600" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-900 font-medium">{patient.address}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentPatientCard;
