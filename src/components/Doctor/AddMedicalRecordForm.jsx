import React, { useState } from 'react';
import { FileText, Pill, Plus, Trash2 } from 'lucide-react';

const AddMedicalRecordForm = ({ onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    diagnosis: '',
    treatment_plan: '',
    prescriptions: [],
  });

  const [currentPrescription, setCurrentPrescription] = useState({
    medication_name: '',
    dosage: '',
    frequency: '',
    duration: '',
    start_date: '',
    end_date: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePrescriptionChange = (e) => {
    const { name, value } = e.target;
    setCurrentPrescription((prev) => ({ ...prev, [name]: value }));
  };

  const addPrescription = () => {
    if (
      currentPrescription.medication_name &&
      currentPrescription.dosage &&
      currentPrescription.frequency &&
      currentPrescription.duration &&
      currentPrescription.start_date &&
      currentPrescription.end_date
    ) {
      setFormData((prev) => ({
        ...prev,
        prescriptions: [...prev.prescriptions, currentPrescription],
      }));
      setCurrentPrescription({
        medication_name: '',
        dosage: '',
        frequency: '',
        duration: '',
        start_date: '',
        end_date: '',
      });
    }
  };

  const removePrescription = (index) => {
    setFormData((prev) => ({
      ...prev,
      prescriptions: prev.prescriptions.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.diagnosis.trim()) {
      newErrors.diagnosis = 'Diagnosis is required';
    }

    if (!formData.treatment_plan.trim()) {
      newErrors.treatment_plan = 'Treatment plan is required';
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

  const today = new Date().toISOString().split('T')[0];

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
          Treatment Plan *
        </label>
        <textarea
          name="treatment_plan"
          value={formData.treatment_plan}
          onChange={handleChange}
          rows={3}
          placeholder="Enter treatment plan details"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
            errors.treatment_plan ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.treatment_plan && (
          <p className="text-red-500 text-sm mt-1">{errors.treatment_plan}</p>
        )}
      </div>

      {/* Prescriptions Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Pill size={16} className="inline mr-2" />
          Prescriptions (Optional)
        </label>

        {/* Added Prescriptions List */}
        {formData.prescriptions.length > 0 && (
          <div className="mb-3 space-y-2">
            {formData.prescriptions.map((prescription, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg p-3"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {prescription.medication_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {prescription.dosage}, {prescription.frequency} for{' '}
                    {prescription.duration}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(prescription.start_date).toLocaleDateString()} -{' '}
                    {new Date(prescription.end_date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removePrescription(index)}
                  className="ml-3 p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add New Prescription Form */}
        <div className="border border-gray-300 rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Medication Name *
              </label>
              <input
                type="text"
                name="medication_name"
                value={currentPrescription.medication_name}
                onChange={handlePrescriptionChange}
                placeholder="e.g., Paracetamol"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Dosage *
              </label>
              <input
                type="text"
                name="dosage"
                value={currentPrescription.dosage}
                onChange={handlePrescriptionChange}
                placeholder="e.g., 500mg"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Frequency *
              </label>
              <input
                type="text"
                name="frequency"
                value={currentPrescription.frequency}
                onChange={handlePrescriptionChange}
                placeholder="e.g., Three times a day"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={currentPrescription.duration}
                onChange={handlePrescriptionChange}
                placeholder="e.g., 5 days"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                name="start_date"
                value={currentPrescription.start_date}
                onChange={handlePrescriptionChange}
                min={today}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                End Date *
              </label>
              <input
                type="date"
                name="end_date"
                value={currentPrescription.end_date}
                onChange={handlePrescriptionChange}
                min={currentPrescription.start_date || today}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={addPrescription}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              !currentPrescription.medication_name ||
              !currentPrescription.dosage ||
              !currentPrescription.frequency ||
              !currentPrescription.duration ||
              !currentPrescription.start_date ||
              !currentPrescription.end_date
            }
          >
            <Plus size={16} />
            Add Prescription
          </button>
        </div>
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
          {loading ? 'Adding...' : 'Add Record'}
        </button>
      </div>
    </form>
  );
};

export default AddMedicalRecordForm;
