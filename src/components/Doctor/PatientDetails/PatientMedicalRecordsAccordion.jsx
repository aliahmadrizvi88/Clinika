import {
  FileText,
  Stethoscope,
  Pill,
  Calendar,
  Edit,
  Trash2,
} from 'lucide-react';
import Accordion from '../../Accordion';

const PatientMedicalRecordsAccordion = ({ records = [] }) => {
  const handleEdit = (recordId) => {
    console.log('Edit record:', recordId);
    // TODO: Implement edit functionality
  };

  const handleDelete = (recordId) => {
    console.log('Delete record:', recordId);
    // TODO: Implement delete functionality
  };

  if (!records.length) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Medical Records
        </h3>
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <FileText size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No medical records available</p>
        </div>
      </div>
    );
  }

  const items = records.map((record, index) => ({
    title: (
      <div className="flex items-center justify-between w-full pr-4">
        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-blue-600" />
          <span className="font-medium">
            Visit #{records.length - index} —{' '}
            {new Date(record.created_at).toLocaleDateString()}
          </span>
        </div>
        <div
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => handleEdit(record._id)}
            className="p-2 hover:bg-blue-100 rounded-lg transition"
            title="Edit record"
          >
            <Edit size={16} className="text-blue-600" />
          </button>
          <button
            onClick={() => handleDelete(record._id)}
            className="p-2 hover:bg-red-100 rounded-lg transition"
            title="Delete record"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>
    ),

    content: (
      <div className="space-y-4">
        {/* Diagnosis */}
        {record.diagnosis && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope size={18} className="text-blue-600" />
              <strong className="text-blue-900">Diagnosis</strong>
            </div>
            <p className="text-gray-700 ml-6">{record.diagnosis}</p>
          </div>
        )}

        {/* Treatment Plan */}
        {record.treatment_plan && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={18} className="text-green-600" />
              <strong className="text-green-900">Treatment Plan</strong>
            </div>
            <p className="text-gray-700 ml-6">{record.treatment_plan}</p>
          </div>
        )}

        {/* Prescriptions */}
        {record.prescriptions?.length > 0 && (
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Pill size={18} className="text-purple-600" />
              <strong className="text-purple-900">Prescriptions</strong>
            </div>
            <ul className="space-y-2 ml-6">
              {record.prescriptions.map((med, i) => (
                <li
                  key={i}
                  className="text-gray-700 bg-white p-3 rounded border border-purple-200"
                >
                  <strong className="text-purple-900">
                    {med.medication_name}
                  </strong>
                  <span className="text-gray-600">
                    {' '}
                    — {med.dosage}, {med.frequency} for {med.duration}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Timestamp */}
        <div className="text-xs text-gray-500 pt-2 border-t">
          Created: {new Date(record.created_at).toLocaleString()}
        </div>
      </div>
    ),
  }));

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Medical Records ({records.length})
      </h3>
      <Accordion items={items} />
    </div>
  );
};

export default PatientMedicalRecordsAccordion;
