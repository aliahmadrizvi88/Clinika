const MedicalInfoSection = ({ patient }) => {
  if (patient.loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Medical Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Allergies', value: patient.allergies },
          {
            label: 'Medical Conditions',
            value: patient.medical_conditions,
          },
          { label: 'Current Medications', value: patient.medications },
          {
            label: 'Emergency Contact',
            value: patient.emergency_contact_phone,
          },
        ].map((item) => (
          <div key={item.label} className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">{item.label}</p>
            <p className="font-medium">{item.value || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalInfoSection;
