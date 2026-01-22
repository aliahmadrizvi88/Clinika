import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDoctor } from '../../context/Doctor/useDoctor';

import PageHeader from '../../components/Doctor/PageHeader';
import PatientProfileSection from '../../components/Doctor/PatientDetails/PatientProfileSection';
import PatientInfoSection from '../../components/Doctor/PatientDetails/PatientInfoSection';
import MedicalInfoSection from '../../components/Doctor/PatientDetails/MedicalInfoSection';
import PatientActionButtons from '../../components/Doctor/PatientDetails/PatientActionButtons';

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    patientDetails,
    fetchPatientById,
    getMedicalRecordById,
    loading,
    error,
  } = useDoctor();

  useEffect(() => {
    if (id) {
      fetchPatientById(id);
      getMedicalRecordById(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="mx-10 my-5">
        <div className="bg-white rounded-xl p-6 text-center">
          <p className="text-gray-500">Loading patient details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-10 my-5">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => navigate('/doctor-side/list')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Patient List
        </button>
      </div>
    );
  }

  if (!patientDetails || !patientDetails.first_name) {
    return (
      <div className="mx-10 my-5">
        <div className="bg-white rounded-xl p-6 text-center">
          <p className="text-gray-500">No patient data available</p>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-10 my-5">
      <PageHeader
        title="Patient Details"
        onBack={() => navigate('/doctor-side/list')}
      />

      <div className="bg-white rounded-xl shadow-lg p-8">
        <PatientProfileSection patient={patientDetails} />
        <PatientInfoSection patient={patientDetails} />
        <MedicalInfoSection patient={patientDetails} />
        <PatientActionButtons
          onBack={() => navigate('/doctor-side/list')}
          onEdit={() => console.log('Edit', patientDetails)}
          onDelete={() => console.log('Delete', patientDetails)}
          onBook={() => console.log('Book', patientDetails)}
        />
      </div>
    </div>
  );
};

export default PatientDetails;
