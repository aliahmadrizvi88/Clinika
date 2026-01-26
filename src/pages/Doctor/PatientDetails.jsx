import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDoctor } from '../../context/Doctor/useDoctor';
import { ArrowLeft } from 'lucide-react';
import PatientProfileSection from '../../components/Doctor/PatientDetails/PatientProfileSection';
import PatientInfoSection from '../../components/Doctor/PatientDetails/PatientInfoSection';
import MedicalInfoSection from '../../components/Doctor/PatientDetails/MedicalInfoSection';
import PatientMedicalRecordsAccordion from '../../components/Doctor/PatientDetails/PatientMedicalRecordsAccordion';
import PatientActionButtons from '../../components/Doctor/PatientDetails/PatientActionButtons';
import UniversalDialog from '../../components/UniversalDialog';

const PatientDetails = () => {
  const { id } = useParams();
  const {
    error,
    loading,
    patientDetails,
    medicalRecords,
    loadPatientDetails,
    getMedicalRecordById,
    deletePatientCascade,
  } = useDoctor();
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    if (id) {
      loadPatientDetails(id);
      getMedicalRecordById(id);
    }
  }, [id, loadPatientDetails, getMedicalRecordById]);

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

  const handleEdit = () => {
    console.log('Edit patient:', patientDetails);
    // TODO: Navigate to edit page or open modal
  };

  const handleConfirmDelete = async () => {
    await deletePatientCascade(patientDetails._id);
    navigate('/doctor-side/list', { replace: true });
  };

  const handleBook = () => {
    console.log('Book appointment for:', patientDetails);
    // TODO: Navigate to booking page or open modal
  };

  return (
    <div className="mx-10 my-5">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/doctor-side/list')}
          className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-extrabold text-2xl">Patient Details</h1>
      </div>

      {/* Patient Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <PatientProfileSection patient={patientDetails} />
        <PatientInfoSection patient={patientDetails} />
        <MedicalInfoSection patient={patientDetails} />
      </div>

      {/* Medical Records Accordion */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <PatientMedicalRecordsAccordion records={medicalRecords} />
      </div>

      {/* Action Buttons */}
      <PatientActionButtons
        onBack={() => navigate('/doctor-side/list')}
        onEdit={handleEdit}
        onDelete={() => setOpenDeleteDialog(true)}
        onBook={handleBook}
      />

      <UniversalDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        type="confirmation"
        title="Delete Patient"
        message="This will permanently delete the patient, all appointments, and all medical records. This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default PatientDetails;
