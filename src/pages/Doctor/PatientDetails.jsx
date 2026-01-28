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
import AppointmentBookingForm from '../../components/Doctor/AppointmentBookingForm';

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
    bookAppointment,
  } = useDoctor();
  const navigate = useNavigate();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

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

  const handleBookAppointment = async (appointmentData) => {
    setBookingLoading(true);
    setBookingError(null);

    try {
      const payload = {
        ...appointmentData,
        patient_id: patientDetails._id || patientDetails.id,
      };

      console.log('Submitting appointment:', payload);

      await bookAppointment(payload);

      setBookingSuccess(true);

      // Close dialog after 2 seconds
      setTimeout(() => {
        setOpenBookingDialog(false);
        setBookingSuccess(false);
        // Optionally redirect to appointments page
        // navigate('/doctor-side/appointment');
      }, 2000);
    } catch (err) {
      setBookingError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          'Failed to book appointment. Please try again.',
      );
    } finally {
      setBookingLoading(false);
    }
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
        onBook={() => setOpenBookingDialog(true)}
      />

      {/* Delete Confirmation Dialog */}
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

      {/* Book Appointment Dialog */}
      <UniversalDialog
        open={openBookingDialog}
        onClose={() => {
          if (!bookingLoading) {
            setOpenBookingDialog(false);
            setBookingError(null);
          }
        }}
        type="form"
        title="Book New Appointment"
        size="lg"
      >
        {bookingSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Appointment Booked Successfully!
            </h3>
            <p className="text-gray-600">The appointment has been scheduled.</p>
          </div>
        ) : (
          <>
            {bookingError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {bookingError}
              </div>
            )}

            {bookingLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-600 mt-4">Booking appointment...</p>
              </div>
            ) : (
              <AppointmentBookingForm
                patient={patientDetails}
                onSubmit={handleBookAppointment}
                onCancel={() => {
                  setOpenBookingDialog(false);
                  setBookingError(null);
                }}
              />
            )}
          </>
        )}
      </UniversalDialog>
    </div>
  );
};

export default PatientDetails;
