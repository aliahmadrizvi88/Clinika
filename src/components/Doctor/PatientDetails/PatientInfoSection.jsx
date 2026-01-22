import { Phone, Mail } from 'lucide-react';

const PatientInfoSection = ({ patient }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Contact & Address
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Phone size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">
              {patient.phone || patient.phone_number || 'N/A'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Mail size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{patient.email || 'N/A'}</p>
          </div>
        </div>
      </div>

      <p className="text-gray-600">
        {patient.address || patient.street_address || 'No address provided'}
      </p>

      {patient.city && (
        <p className="text-gray-600 mt-1">
          {patient.city}, {patient.state || ''} {patient.zip_code || ''}
        </p>
      )}
    </div>
  );
};

export default PatientInfoSection;
