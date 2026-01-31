import { Phone, Mail, MapPin } from 'lucide-react';

const PatientInfoSection = ({ patient }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Contact Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
            <Phone size={18} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Phone Number</p>
            <p className="font-medium text-gray-900">
              {patient.phone || patient.phone_number || 'Not provided'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
            <Mail size={18} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Email Address</p>
            <p className="font-medium text-gray-900">
              {patient.email || 'Not provided'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 md:col-span-2">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
            <MapPin size={18} className="text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Address</p>
            <p className="font-medium text-gray-900">
              {patient.address ||
                patient.street_address ||
                'No address provided'}
            </p>
            {patient.city && (
              <p className="text-sm text-gray-500 mt-1">
                {patient.city}, {patient.state} {patient.zip_code}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoSection;
