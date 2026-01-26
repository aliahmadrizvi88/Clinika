const AppointmentMedicalRecords = ({ records = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
      <h2 className="text-lg font-semibold mb-4">Medical Records</h2>

      {records.length === 0 ? (
        <p className="text-gray-500">
          No medical records created for this appointment.
        </p>
      ) : (
        records.map((record) => (
          <div key={record._id} className="border rounded-lg p-4 mb-4 text-sm">
            <p>
              <strong>Diagnosis:</strong> {record.diagnosis}
            </p>
            <p>
              <strong>Treatment:</strong> {record.treatment_plan}
            </p>

            {record.prescriptions?.length > 0 && (
              <div className="mt-2">
                <strong>Prescriptions:</strong>
                <ul className="list-disc ml-5">
                  {record.prescriptions.map((p, i) => (
                    <li key={i}>
                      {p.medication_name} – {p.dosage}, {p.frequency} (
                      {p.duration})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AppointmentMedicalRecords;
