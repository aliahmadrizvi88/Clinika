import { useState, useEffect } from 'react';
import { DoctorContext } from './DoctorContext';
import { useAuth } from '../Auth/DoctorAuth/useAuth';
import api from '../../api/api';

const DoctorProvider = ({ children }) => {
  const { token, doctor } = useAuth();

  // Handle doctor as string or object
  const id = typeof doctor === 'string' ? doctor : doctor?.id || doctor?._id;

  const [patients, setPatients] = useState([]);
  const [patientDetails, setPatientDetails] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Clear data when doctor changes or logs out
  useEffect(() => {
    if (!token || !doctor) {
      setPatients([]);
      setAppointment([]);
      setError(null);
    }
  }, [token, doctor]);

  const fetchPatients = async () => {
    if (!token) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/patients/allpatients');

      const patientsArray = Array.isArray(response.data)
        ? response.data
        : response.data.data || response.data.patients || [];

      setPatients(patientsArray);
      return patientsArray;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch patients');
      setPatients([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single patient by ID
  const fetchPatientById = async (patientId) => {
    if (!token || !patientId) {
      return null;
    }

    try {
      const response = await api.get(`/patients/profile/${patientId}`);
      setPatientDetails(response.data);
      return response.data;
    } catch (err) {
      console.error('Error fetching patient:', patientId, err);
      setError('Error fetching patient:', patientId, err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointment = async () => {
    if (!token || !id) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/bookings/doctor/${id}`);

      // Handle different response structures
      let appointments = [];
      if (Array.isArray(res.data)) {
        appointments = res.data;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        appointments = res.data.data;
      } else if (
        res.data?.appointments &&
        Array.isArray(res.data.appointments)
      ) {
        appointments = res.data.appointments;
      }

      // Filter out any null/undefined values
      const validAppointments = appointments.filter(
        (appt) => appt && (appt._id || appt.id),
      );

      // Fetch patient details for each appointment
      const appointmentsWithPatients = await Promise.all(
        validAppointments.map(async (appt) => {
          if (appt.patient_id && typeof appt.patient_id === 'string') {
            const patientData = await fetchPatientById(appt.patient_id);
            return {
              ...appt,
              patient_details: patientData,
            };
          }
          return appt;
        }),
      );

      // Sort appointments by date (newest first)
      const sortedAppointments = appointmentsWithPatients.sort((a, b) => {
        const dateA = new Date(
          a.appointment_date || a.appointmentDate || a.date,
        );
        const dateB = new Date(
          b.appointment_date || b.appointmentDate || b.date,
        );
        return dateB - dateA;
      });

      setAppointment(sortedAppointments);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch appointments',
      );
      setAppointment([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        patients,
        fetchPatients,
        appointment,
        fetchAppointment,
        patientDetails,
        fetchPatientById,
        error,
        loading,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;
