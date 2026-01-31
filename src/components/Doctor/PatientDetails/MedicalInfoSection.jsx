import { Heart, AlertCircle, Pill, Phone } from 'lucide-react';

const MedicalInfoSection = ({ patient }) => {
  const medicalInfo = [
    {
      label: 'Allergies',
      value: patient.allergies,
      icon: AlertCircle,
      color: 'red',
    },
    {
      label: 'Medical Conditions',
      value: patient.medical_conditions,
      icon: Heart,
      color: 'purple',
    },
    {
      label: 'Current Medications',
      value: patient.medications,
      icon: Pill,
      color: 'green',
    },
    {
      label: 'Emergency Contact',
      value: patient.emergency_contact_phone,
      icon: Phone,
      color: 'orange',
    },
  ];

  const colorClasses = {
    red: 'bg-red-100 text-red-700',
    purple: 'bg-purple-100 text-purple-700',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Medical Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {medicalInfo.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="bg-gray-50 border border-gray-200 p-4 rounded-lg hover:shadow-sm transition"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} className="text-gray-500" />
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
              <p
                className={`font-medium px-2 py-1 rounded inline-block ${item.value ? colorClasses[item.color] : 'text-gray-400'}`}
              >
                {item.value || 'None reported'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MedicalInfoSection;
