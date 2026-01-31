const ProfessionalInfo = ({ doctor }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold text-gray-800 mb-4">
        Professional Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <p>
          <strong>Specialization:</strong> {doctor.specialization || 'N/A'}
        </p>
        <p>
          <strong>Qualifications:</strong> {doctor.qualifications || 'N/A'}
        </p>
        <p>
          <strong>Experience:</strong>{' '}
          {doctor.experience ? `${doctor.experience} years` : 'N/A'}
        </p>
        <p>
          <strong>License No:</strong> {doctor.licence_number || 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default ProfessionalInfo;
