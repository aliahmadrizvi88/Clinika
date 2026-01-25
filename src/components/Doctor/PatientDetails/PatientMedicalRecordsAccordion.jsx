import { FileText, User, Stethoscope, Pill, Calendar } from 'lucide-react';
import Accordion from '../../Accordion';

const PatientMedicalRecordsAccordion = ({ records = [] }) => {
  if (!records.length) return null;

  const items = records.map((record, index) => ({
    title: (
      <div className="flex items-center gap-3">
        <Calendar size={18} className="text-blue-600" />
        <span className="font-medium">
          Visit #{index + 1} —{' '}
          {new Date(record.created_at).toLocaleDateString()}
        </span>
      </div>
    ),

    content: (
      <div className="space-y-4 text-sm">
        {/* Diagnosis */}
        <div className="flex items-center gap-2">
          <Stethoscope size={16} className="text-gray-500" />
          <span>
            <strong>Diagnosis:</strong> {record.diagnosis || 'N/A'}
          </span>
        </div>

        {/* Treatment Plan */}
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-gray-500" />
          <span>
            <strong>Treatment Plan:</strong> {record.treatment_plan || 'N/A'}
          </span>
        </div>

        {/* Prescriptions */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Pill size={16} className="text-gray-500" />
            <strong>Prescriptions</strong>
          </div>

          {record.prescriptions?.length ? (
            <ul className="space-y-2 ml-6 list-disc">
              {record.prescriptions.map((med, i) => (
                <li key={i}>
                  <strong>{med.medication_name}</strong> — {med.dosage},{' '}
                  {med.frequency} for {med.duration}
                </li>
              ))}
            </ul>
          ) : (
            <p className="ml-6 text-gray-500">No prescriptions</p>
          )}
        </div>

        {/* Created At */}
        <div className="text-xs text-gray-500">
          Created at: {new Date(record.created_at).toLocaleString()}
        </div>
      </div>
    ),

    actions: [
      {
        label: 'View',
        onClick: () => console.log('View record', record._id),
      },
      {
        label: 'Delete',
        onClick: () => console.log('Delete record', record._id),
      },
    ],
  }));

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Medical Records
      </h3>
      <Accordion items={items} />
    </div>
  );
};

export default PatientMedicalRecordsAccordion;
