import { FileText, Pill, Stethoscope, Plus } from 'lucide-react';

const AppointmentMedicalRecords = ({ records = [], onAddRecord }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Medical Records</h2>
        <button
          onClick={onAddRecord}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
        >
          <Plus size={16} />
          Add Record
        </button>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">No medical records created yet</p>
          <button
            onClick={onAddRecord}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Create First Record
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((record, index) => (
            <div
              key={record._id || index}
              className="border-2 border-blue-100 rounded-lg p-6 bg-blue-50/30 hover:bg-blue-50/50 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">
                  Record #{records.length - index}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(record.created_at).toLocaleDateString()}
                </span>
              </div>

              {record.diagnosis && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Stethoscope size={18} className="text-blue-600" />
                    <p className="font-medium text-gray-700">Diagnosis</p>
                  </div>
                  <p className="text-gray-600 ml-6">{record.diagnosis}</p>
                </div>
              )}

              {record.treatment_plan && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={18} className="text-green-600" />
                    <p className="font-medium text-gray-700">Treatment Plan</p>
                  </div>
                  <p className="text-gray-600 ml-6">{record.treatment_plan}</p>
                </div>
              )}

              {record.prescriptions?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Pill size={18} className="text-purple-600" />
                    <p className="font-medium text-gray-700">Prescriptions</p>
                  </div>
                  <ul className="space-y-2 ml-6">
                    {record.prescriptions.map((p, i) => (
                      <li key={i} className="text-gray-600">
                        <strong>{p.medication_name}</strong> — {p.dosage},{' '}
                        {p.frequency} for {p.duration}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentMedicalRecords;
