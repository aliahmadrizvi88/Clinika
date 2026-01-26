const AppointmentPatientCard = ({ patient }) => {
  if (!patient) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
      <h2 className="text-lg font-semibold mb-4">Patient Information</h2>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <p>
          <strong>Name:</strong> {patient.first_name} {patient.last_name}
        </p>
        <p>
          <strong>Phone:</strong>{' '}
          {patient.phone || patient.phone_number || 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default AppointmentPatientCard;
