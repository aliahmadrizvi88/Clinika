import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

const RescheduleAppointmentForm = ({
  appointment,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [formData, setFormData] = useState({
    appointment_date: appointment.appointment_date?.split('T')[0] || '',
    appointment_time: appointment.appointment_time
      ? new Date(appointment.appointment_time).toTimeString().slice(0, 5)
      : '',
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        appointment_date: formData.appointment_date,
        appointment_time: new Date(
          `${formData.appointment_date}T${formData.appointment_time}:00.000Z`,
        ).toISOString(),
      };

      onSubmit(payload);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-blue-800">
          <strong>Current Schedule:</strong>{' '}
          {new Date(appointment.appointment_date).toLocaleDateString()} at{' '}
          {new Date(appointment.appointment_time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {/* New Appointment Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Calendar size={16} className="inline mr-2" />
          New Appointment Date *
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

      {/* New Appointment Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Clock size={16} className="inline mr-2" />
          New Appointment Time *
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

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> The appointment will be rescheduled to the new
          date and time. The patient will be notified of this change.
        </p>
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
          {loading ? 'Rescheduling...' : 'Reschedule Appointment'}
        </button>
      </div>
    </form>
  );
};

export default RescheduleAppointmentForm;
