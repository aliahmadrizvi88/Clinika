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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading patient details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-10 my-5">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl">
          <p className="font-semibold">Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
        <button
          onClick={() => navigate('/doctor-side/list')}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Back to Patient List
        </button>
      </div>
    );
  }

  if (!patientDetails || !patientDetails.first_name) {
    return (
      <div className="mx-10 my-5">
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
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

      await bookAppointment(payload);
      setBookingSuccess(true);

      setTimeout(() => {
        setOpenBookingDialog(false);
        setBookingSuccess(false);
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 pb-10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/doctor-side/list')}
            className="p-2 hover:bg-white rounded-full transition shadow-sm"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              Patient Details
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              View and manage patient information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <PatientProfileSection patient={patientDetails} />
              <PatientInfoSection patient={patientDetails} />
              <MedicalInfoSection patient={patientDetails} />
            </div>

            {/* Medical Records */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <PatientMedicalRecordsAccordion records={medicalRecords} />
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <PatientActionButtons
                onBack={() => navigate('/doctor-side/list')}
                onEdit={handleEdit}
                onDelete={() => setOpenDeleteDialog(true)}
                onBook={() => setOpenBookingDialog(true)}
              />
            </div>
          </div>
        </div>
      </div>

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
