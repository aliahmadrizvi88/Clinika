import React, { useState } from 'react';
import { Calendar, Clock, FileText } from 'lucide-react';

const EditAppointmentForm = ({ appointment, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    appointment_date: appointment.appointment_date?.split('T')[0] || '',
    appointment_time: appointment.appointment_time
      ? new Date(appointment.appointment_time).toTimeString().slice(0, 5)
      : '',
    duration_minutes: appointment.duration_minutes || 30,
    status: appointment.status || 'Scheduled',
    reason_for_visit: appointment.reason_for_visit || '',
    notes: appointment.notes || '',
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

    if (!formData.appointment_date) {
      newErrors.appointment_date = 'Date is required';
    }

    if (!formData.appointment_time) {
      newErrors.appointment_time = 'Time is required';
    }

    if (!formData.reason_for_visit.trim()) {
      newErrors.reason_for_visit = 'Reason for visit is required';
    } else if (formData.reason_for_visit.trim().length < 20) {
      newErrors.reason_for_visit = 'Reason must be at least 20 characters';
    }

    if (!formData.duration_minutes || formData.duration_minutes < 15) {
      newErrors.duration_minutes = 'Duration must be at least 15 minutes';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        ...formData,
        duration_minutes: parseInt(formData.duration_minutes),
        appointment_time: new Date(
          `${formData.appointment_date}T${formData.appointment_time}:00.000Z`,
        ).toISOString(),
        reason_for_visit: formData.reason_for_visit.trim(),
        notes: formData.notes.trim(),
      };

      onSubmit(payload);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];
  const reasonLength = formData.reason_for_visit.trim().length;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Appointment Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Calendar size={16} className="inline mr-2" />
          Appointment Date *
        </label>
        <input
          type="date"
          name="appointment_date"
          value={formData.appointment_date}
          onChange={handleChange}
          min={minDate}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.appointment_date ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.appointment_date && (
          <p className="text-red-500 text-sm mt-1">{errors.appointment_date}</p>
        )}
      </div>

      {/* Appointment Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Clock size={16} className="inline mr-2" />
          Appointment Time *
        </label>
        <input
          type="time"
          name="appointment_time"
          value={formData.appointment_time}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.appointment_time ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.appointment_time && (
          <p className="text-red-500 text-sm mt-1">{errors.appointment_time}</p>
        )}
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Duration (minutes) *
        </label>
        <select
          name="duration_minutes"
          value={formData.duration_minutes}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.duration_minutes ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value={15}>15 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>60 minutes</option>
          <option value={90}>90 minutes</option>
        </select>
        {errors.duration_minutes && (
          <p className="text-red-500 text-sm mt-1">{errors.duration_minutes}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status *
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Confirmed">Confirmed</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="No Show">No Show</option>
        </select>
      </div>

      {/* Reason for Visit */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText size={16} className="inline mr-2" />
          Reason for Visit * (min 20 characters)
        </label>
        <textarea
          name="reason_for_visit"
          value={formData.reason_for_visit}
          onChange={handleChange}
          rows={3}
          placeholder="Please describe the reason for this visit in detail (minimum 20 characters)..."
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
            errors.reason_for_visit ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.reason_for_visit && (
            <p className="text-red-500 text-sm">{errors.reason_for_visit}</p>
          )}
          <p
            className={`text-sm ml-auto ${
              reasonLength < 20 ? 'text-red-500' : 'text-green-600'
            }`}
          >
            {reasonLength}/20
          </p>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes (Optional)
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

      {/* Action Buttons */}
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
          {loading ? 'Updating...' : 'Update Appointment'}
        </button>
      </div>
    </form>
  );
};

export default EditAppointmentForm;
