import React, { useState } from 'react';

const AddPatientModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    blood_group: '',
    allergies: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-150 max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Patient</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Personal Info */}
          <div className="flex gap-2">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="border rounded p-2 flex-1"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="border rounded p-2 flex-1"
              required
            />
          </div>

          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Contact Info */}
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
          <div className="flex gap-2">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border rounded p-2 flex-1"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border rounded p-2 flex-1"
            />
          </div>
          <input
            type="text"
            name="zip_code"
            placeholder="ZIP Code"
            value={formData.zip_code}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />

          {/* Emergency Contact */}
          <input
            type="text"
            name="emergency_contact_name"
            placeholder="Emergency Contact Name"
            value={formData.emergency_contact_name}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
          <input
            type="text"
            name="emergency_contact_phone"
            placeholder="Emergency Contact Phone"
            value={formData.emergency_contact_phone}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />

          {/* Health Info */}
          <input
            type="text"
            name="blood_group"
            placeholder="Blood Group"
            value={formData.blood_group}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
          <input
            type="text"
            name="allergies"
            placeholder="Allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />

          {/* Buttons */}
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
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;
