import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDoctor } from '../../context/Doctor/useDoctor';

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

  useEffect(() => {
    if (id) {
      loadAppointmentDetails(id);
    }
  }, [id, loadAppointmentDetails]);

  if (loading) {
    return (
      <div className="mx-10 my-5 bg-white p-6 rounded-xl text-center">
        <p className="text-gray-500">Loading appointment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-10 my-5">
        <div className="bg-red-100 border border-red-400 text-red-700 p-6 rounded-xl">
          {error}
        </div>
        <button
          onClick={() => navigate('/doctor-side/appointment')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Appointments
        </button>
      </div>
    );
  }

  if (!selectedAppointment) {
    return (
      <div className="mx-10 my-5 bg-white p-6 rounded-xl text-center">
        <p className="text-gray-500">No appointment found</p>
        <button
          onClick={() => navigate('/doctor-side/appointment')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Appointments
        </button>
      </div>
    );
  }

  // Get patient details - handle both populated and unpopulated cases
  const patient =
    selectedAppointment.patient_details ||
    (typeof selectedAppointment.patient_id === 'object'
      ? selectedAppointment.patient_id
      : null);

  // Get medical records
  const medicalRecords = selectedAppointment.medical_records || [];

  return (
    <div className="mx-10 my-5">
      <AppointmentHeader onBack={() => navigate('/doctor-side/appointment')} />

      <AppointmentInfoCard appointment={selectedAppointment} />

      {patient && <AppointmentPatientCard patient={patient} />}

      <AppointmentMedicalRecords records={medicalRecords} />

      <AppointmentActions
        appointment={selectedAppointment}
        onComplete={() => navigate(`/doctor-side/appointment/${id}/complete`)}
        onCancel={() => {
          // TODO: Handle cancel
          console.log('Cancel appointment');
        }}
        onReschedule={() => {
          // TODO: Handle reschedule
          console.log('Reschedule appointment');
        }}
      />
    </div>
  );
};

export default AppointmentDetails;
