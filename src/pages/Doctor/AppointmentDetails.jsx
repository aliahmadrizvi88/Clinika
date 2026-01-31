import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDoctor } from '../../context/Doctor/useDoctor';
import UniversalDialog from '../../components/UniversalDialog';

import AppointmentHeader from '../../components/Doctor/AppointmentDetails/AppointmentHeader';
import AppointmentInfoCard from '../../components/Doctor/AppointmentDetails/AppointmentInfoCard';
import AppointmentPatientCard from '../../components/Doctor/AppointmentDetails/AppointmentPatientCard';
import AppointmentMedicalRecords from '../../components/Doctor/AppointmentDetails/AppointmentMedicalRecords';
import AppointmentActions from '../../components/Doctor/AppointmentDetails/AppointmentActions';

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { selectedAppointment, loadAppointmentDetails, loading, error } =
    useDoctor();

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showMedicalRecordModal, setShowMedicalRecordModal] = useState(false);

  useEffect(() => {
    if (id) {
      loadAppointmentDetails(id);
    }
  }, [id, loadAppointmentDetails]);

  const handleCancelAppointment = async () => {
    // TODO: Implement cancel appointment API call
    console.log('Cancelling appointment:', id);
    setShowCancelDialog(false);
    // navigate('/doctor-side/appointment');
  };

  const handleAddMedicalRecord = (recordData) => {
    // TODO: Implement add medical record API call
    console.log('Adding medical record:', recordData);
    setShowMedicalRecordModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-10 my-5">
        <div className="bg-red-100 border border-red-400 text-red-700 p-6 rounded-xl">
          <p className="font-semibold">Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
        <button
          onClick={() => navigate('/doctor-side/appointment')}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Back to Appointments
        </button>
      </div>
    );
  }

  if (!selectedAppointment) {
    return (
      <div className="mx-10 my-5 bg-white p-12 rounded-xl text-center shadow-sm">
        <p className="text-gray-500 mb-4">No appointment found</p>
        <button
          onClick={() => navigate('/doctor-side/appointment')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Back to Appointments
        </button>
      </div>
    );
  }

  const patient =
    selectedAppointment.patient_details ||
    (typeof selectedAppointment.patient_id === 'object'
      ? selectedAppointment.patient_id
      : null);

  const medicalRecords = selectedAppointment.medical_records || [];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 pb-10">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <AppointmentHeader
          onBack={() => navigate('/doctor-side/appointment')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Appointment & Patient Info */}
          <div className="lg:col-span-2 space-y-6">
            <AppointmentInfoCard appointment={selectedAppointment} />
            {patient && <AppointmentPatientCard patient={patient} />}
            <AppointmentMedicalRecords
              records={medicalRecords}
              onAddRecord={() => setShowMedicalRecordModal(true)}
            />
          </div>

          {/* Right Column - Actions */}
          <div className="lg:col-span-1">
            <AppointmentActions
              appointment={selectedAppointment}
              onComplete={() =>
                navigate(`/doctor-side/appointment/${id}/complete`)
              }
              onCancel={() => setShowCancelDialog(true)}
              onReschedule={() => console.log('Reschedule')}
              onAddMedicalRecord={() => setShowMedicalRecordModal(true)}
            />
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      <UniversalDialog
        open={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        type="confirmation"
        title="Cancel Appointment"
        message="Are you sure you want to cancel this appointment? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="No, Keep It"
        onConfirm={handleCancelAppointment}
        onCancel={() => setShowCancelDialog(false)}
      />
    </div>
  );
};

export default AppointmentDetails;
