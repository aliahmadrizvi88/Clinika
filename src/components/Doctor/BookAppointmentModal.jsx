import React, { useState } from 'react';

const BookAppointmentModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    appointment_date: '',
    appointment_time: '',
    duration_minutes: 30,
    status: 'scheduled',
    reason_for_visit: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // close modal after submit
  };

  if (!isOpen) return null; // hide modal if not open

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label>
            Date:
            <input
              type="date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={handleChange}
              className="border rounded p-1 w-full"
              required
            />
          </label>

          <label>
            Time:
            <input
              type="time"
              name="appointment_time"
              value={formData.appointment_time}
              onChange={handleChange}
              className="border rounded p-1 w-full"
              required
            />
          </label>

          <label>
            Duration (minutes):
            <input
              type="number"
              name="duration_minutes"
              value={formData.duration_minutes}
              onChange={handleChange}
              className="border rounded p-1 w-full"
              min={5}
              required
            />
          </label>

          <label>
            Reason for Visit:
            <input
              type="text"
              name="reason_for_visit"
              value={formData.reason_for_visit}
              onChange={handleChange}
              className="border rounded p-1 w-full"
              required
            />
          </label>

          <label>
            Notes:
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="border rounded p-1 w-full"
            />
          </label>

          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#3bbb9c] text-white hover:bg-[#35a28f]"
            >
              Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
