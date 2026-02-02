import React, { useState } from 'react';
import { FileText } from 'lucide-react';

const EditMedicalRecordForm = ({ record, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    diagnosis: record.diagnosis || '',
    treatment: record.treatment || '',
    prescription: record.prescription || '',
    notes: record.notes || '',
    follow_up_date: record.follow_up_date?.split('T')[0] || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.diagnosis.trim()) {
      newErrors.diagnosis = 'Diagnosis is required';
    }

    if (!formData.treatment.trim()) {
      newErrors.treatment = 'Treatment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText size={16} className="inline mr-2" />
          Diagnosis *
        </label>
        <textarea
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          rows={3}
          placeholder="Enter diagnosis details"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
            errors.diagnosis ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.diagnosis && (
          <p className="text-red-500 text-sm mt-1">{errors.diagnosis}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText size={16} className="inline mr-2" />
          Treatment *
        </label>
        <textarea
          name="treatment"
          value={formData.treatment}
          onChange={handleChange}
          rows={3}
          placeholder="Enter treatment plan"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
            errors.treatment ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.treatment && (
          <p className="text-red-500 text-sm mt-1">{errors.treatment}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Prescription
        </label>
        <textarea
          name="prescription"
          value={formData.prescription}
          onChange={handleChange}
          rows={3}
          placeholder="Enter prescribed medications and dosages"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any additional information..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Follow-up Date
        </label>
        <input
          type="date"
          name="follow_up_date"
          value={formData.follow_up_date}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Record'}
        </button>
      </div>
    </form>
  );
};

export default EditMedicalRecordForm;
