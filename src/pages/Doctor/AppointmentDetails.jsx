import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDoctor } from '../../context/Doctor/useDoctor';
import UniversalDialog from '../../components/UniversalDialog';
import EditAppointmentForm from '../../components/Doctor/EditAppointmentForm';
import AddMedicalRecordForm from '../../components/Doctor/AddMedicalRecordForm';
import RescheduleAppointmentForm from '../../components/Doctor/RescheduleAppointmentForm';

import AppointmentHeader from '../../components/Doctor/AppointmentDetails/AppointmentHeader';
import AppointmentInfoCard from '../../components/Doctor/AppointmentDetails/AppointmentInfoCard';
import AppointmentPatientCard from '../../components/Doctor/AppointmentDetails/AppointmentPatientCard';
import AppointmentMedicalRecords from '../../components/Doctor/AppointmentDetails/AppointmentMedicalRecords';
import AppointmentActions from '../../components/Doctor/AppointmentDetails/AppointmentActions';

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    selectedAppointment,
    loadAppointmentDetails,
    updateAppointment,
    cancelAppointment,
    completeAppointment,
    deleteAppointment,
    addMedicalRecord,
    loading,
    error,
  } = useDoctor();

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [showMedicalRecordModal, setShowMedicalRecordModal] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);

  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [recordLoading, setRecordLoading] = useState(false);
  const [recordError, setRecordError] = useState(null);
  const [rescheduleLoading, setRescheduleLoading] = useState(false);
  const [rescheduleError, setRescheduleError] = useState(null);

  useEffect(() => {
    if (id) {
      loadAppointmentDetails(id);
    }
  }, [id, loadAppointmentDetails]);

  /* ==================== HANDLERS ==================== */
  const handleEditAppointment = async (formData) => {
    setEditLoading(true);
    setEditError(null);

    try {
      await updateAppointment(selectedAppointment._id, formData);
      setOpenEditDialog(false);
      await loadAppointmentDetails(id);
    } catch (err) {
      setEditError(
        err.response?.data?.message || 'Failed to update appointment',
      );
    } finally {
      setEditLoading(false);
    }
  };

  const handleCancelAppointment = async () => {
    setActionLoading(true);
    try {
      await cancelAppointment(selectedAppointment._id);
      setShowCancelDialog(false);
      await loadAppointmentDetails(id);
    } catch (err) {
      console.error('Cancel failed:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCompleteAppointment = async () => {
    setActionLoading(true);
    try {
      await completeAppointment(selectedAppointment._id);
      setShowCompleteDialog(false);
      await loadAppointmentDetails(id);
    } catch (err) {
      console.error('Complete failed:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteAppointment = async () => {
    setActionLoading(true);
    try {
      await deleteAppointment(selectedAppointment._id);
      navigate('/doctor-side/appointment', { replace: true });
    } catch (err) {
      console.error('Delete failed:', err);
      setActionLoading(false);
    }
  };

  const handleAddMedicalRecord = async (formData) => {
    setRecordLoading(true);
    setRecordError(null);

    try {
      const patientId =
        selectedAppointment.patient_id?._id || selectedAppointment.patient_id;

      const payload = {
        ...formData,
        patient_id: patientId,
        booking_id: selectedAppointment._id,
      };

      await addMedicalRecord(payload);
      setShowMedicalRecordModal(false);
      await loadAppointmentDetails(id);
    } catch (err) {
      setRecordError(
        err.response?.data?.message || 'Failed to add medical record',
      );
    } finally {
      setRecordLoading(false);
    }
  };

  const handleRescheduleAppointment = async (formData) => {
    setRescheduleLoading(true);
    setRescheduleError(null);

    try {
      await updateAppointment(selectedAppointment._id, formData);
      setShowRescheduleDialog(false);
      await loadAppointmentDetails(id);
    } catch (err) {
      setRescheduleError(
        err.response?.data?.message || 'Failed to reschedule appointment',
      );
    } finally {
      setRescheduleLoading(false);
    }
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
              onEdit={() => setOpenEditDialog(true)}
              onComplete={() => setShowCompleteDialog(true)}
              onCancel={() => setShowCancelDialog(true)}
              onDelete={() => setShowDeleteDialog(true)}
              onReschedule={() => setShowRescheduleDialog(true)}
            />
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <UniversalDialog
        open={openEditDialog}
        onClose={() => {
          if (!editLoading) {
            setOpenEditDialog(false);
            setEditError(null);
          }
        }}
        type="form"
        title="Edit Appointment"
        size="lg"
      >
        {editError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {editError}
          </div>
        )}
        <EditAppointmentForm
          appointment={selectedAppointment}
          onSubmit={handleEditAppointment}
          onCancel={() => setOpenEditDialog(false)}
          loading={editLoading}
        />
      </UniversalDialog>

      {/* Add Medical Record Dialog */}
      <UniversalDialog
        open={showMedicalRecordModal}
        onClose={() => {
          if (!recordLoading) {
            setShowMedicalRecordModal(false);
            setRecordError(null);
          }
        }}
        type="form"
        title="Add Medical Record"
        size="lg"
      >
        {recordError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {recordError}
          </div>
        )}
        <AddMedicalRecordForm
          patientId={
            selectedAppointment.patient_id?._id ||
            selectedAppointment.patient_id
          }
          onSubmit={handleAddMedicalRecord}
          onCancel={() => setShowMedicalRecordModal(false)}
          loading={recordLoading}
        />
      </UniversalDialog>

      {/* Cancel Confirmation Dialog */}
      <UniversalDialog
        open={showCancelDialog}
        onClose={() => !actionLoading && setShowCancelDialog(false)}
        type="confirmation"
        title="Cancel Appointment"
        message="Are you sure you want to cancel this appointment? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="No, Keep It"
        onConfirm={handleCancelAppointment}
        onCancel={() => setShowCancelDialog(false)}
      />

      {/* Complete Dialog */}
      <UniversalDialog
        open={showCompleteDialog}
        onClose={() => !actionLoading && setShowCompleteDialog(false)}
        type="confirmation"
        title="Complete Appointment"
        message="Mark this appointment as completed?"
        confirmText="Mark Complete"
        cancelText="Cancel"
        onCancel={() => setShowCompleteDialog(false)}
        onConfirm={handleCompleteAppointment}
      />

      {/* Delete Dialog */}
      <UniversalDialog
        open={showDeleteDialog}
        onClose={() => !actionLoading && setShowDeleteDialog(false)}
        type="confirmation"
        title="Delete Appointment"
        message="Are you sure you want to permanently delete this appointment? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAppointment}
      />

      {/* Reschedule Dialog */}
      <UniversalDialog
        open={showRescheduleDialog}
        onClose={() => {
          if (!rescheduleLoading) {
            setShowRescheduleDialog(false);
            setRescheduleError(null);
          }
        }}
        type="form"
        title="Reschedule Appointment"
        size="md"
      >
        {rescheduleError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {rescheduleError}
          </div>
        )}
        <RescheduleAppointmentForm
          appointment={selectedAppointment}
          onSubmit={handleRescheduleAppointment}
          onCancel={() => setShowRescheduleDialog(false)}
          loading={rescheduleLoading}
        />
      </UniversalDialog>
    </div>
  );
};

export default AppointmentDetails;
