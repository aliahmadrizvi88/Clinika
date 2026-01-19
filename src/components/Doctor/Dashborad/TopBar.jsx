import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import api from '../../../api/api';
import AddPatientModal from '../AddPatientModel';

const TopBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPatient = (data) => {
    console.log('AppointmentData: ', data);

    try {
      api.post('/patients/addpatient', data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="flex justify-between items-center">
      <div className="relative w-72">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          placeholder="Search appointments..."
          className="w-full pl-10 py-2 rounded-xl border outline-none focus:border-[#3bbb9c]"
        />
      </div>

      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="font-bold bg-[#2a89b9] text-white px-4 py-2 rounded-xl flex items-center gap-3 cursor-pointer"
      >
        <Plus size={18} /> Add Patient
      </button>
      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPatient}
      />
    </div>
  );
};

export default TopBar;
