import { useState, useEffect, useCallback, useMemo } from 'react';
import { DoctorContext } from './DoctorContext';
import { useAuth } from '../Auth/DoctorAuth/useAuth';
import api from '../../api/api';

const DoctorProvider = ({ children }) => {
  const { token, doctor } = useAuth();

  // Handle doctor as string or object
  const doctorId =
    typeof doctor === 'string' ? doctor : doctor?.id || doctor?._id;

  /* -------------------- State -------------------- */
  const [patients, setPatients] = useState([]);
  const [patientDetails, setPatientDetails] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* -------------------- Session Keys (Doctor Scoped) -------------------- */
  const STORAGE_KEYS = useMemo(() => {
    if (!doctorId) return null;

    return {
      PATIENTS: `doctor_${doctorId}_patients`,
      APPOINTMENTS: `doctor_${doctorId}_appointments`,
      PATIENT_DETAILS: `doctor_${doctorId}_patient_details`,
      MEDICAL_RECORDS: `doctor_${doctorId}_medical_records`,
    };
  }, [doctorId]);

  /* -------------------- Restore from Session -------------------- */
  useEffect(() => {
    if (!token || !doctor || !STORAGE_KEYS) return;

    const patients = sessionStorage.getItem(STORAGE_KEYS.PATIENTS);
    const appointments = sessionStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    const patientDetails = sessionStorage.getItem(STORAGE_KEYS.PATIENT_DETAILS);
    const medicalRecords = sessionStorage.getItem(STORAGE_KEYS.MEDICAL_RECORDS);

    if (patients) setPatients(JSON.parse(patients));
    if (appointments) setAppointment(JSON.parse(appointments));
    if (patientDetails) setPatientDetails(JSON.parse(patientDetails));
    if (medicalRecords) setMedicalRecords(JSON.parse(medicalRecords));
  }, [token, doctor, STORAGE_KEYS]);

  /* -------------------- Clear on Logout -------------------- */
  useEffect(() => {
    if (token && doctor) return;

    setPatients([]);
    setAppointment([]);
    setPatientDetails(null);
    setMedicalRecords([]);
    setError(null);

    if (!STORAGE_KEYS) return;

    Object.values(STORAGE_KEYS).forEach((key) =>
      sessionStorage.removeItem(key),
    );
  }, [token, doctor, STORAGE_KEYS]);

  /* -------------------- Fetch Patients -------------------- */
  const fetchPatients = useCallback(async () => {
    if (!token || !STORAGE_KEYS) return [];

    if (patients.length) return patients;

    setLoading(true);
    setError(null);

    try {
      const res = await api.get('/patients/allpatients');

      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.data || res.data?.patients || [];

      setPatients(list);
      sessionStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(list));

      return list;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch patients');
      return [];
    } finally {
      setLoading(false);
    }
  }, [token, patients, STORAGE_KEYS]);

  /* -------------------- Fetch Patient By ID -------------------- */
  const fetchPatientById = useCallback(
    async (patientId) => {
      if (!token || !patientId || !STORAGE_KEYS) return null;

      if (patientDetails?._id === patientId) {
        return patientDetails;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await api.get(`/patients/profile/${patientId}`);

        setPatientDetails(res.data);
        sessionStorage.setItem(
          STORAGE_KEYS.PATIENT_DETAILS,
          JSON.stringify(res.data),
        );

        return res.data;
      } catch (err) {
        setError('Failed to fetch patient', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token, patientDetails, STORAGE_KEYS],
  );

  /* -------------------- Fetch Medical Records -------------------- */
  const getMedicalRecordById = useCallback(
    async (patientId) => {
      if (!token || !patientId || !STORAGE_KEYS) return;

      if (medicalRecords.length) return medicalRecords;

      try {
        const res = await api.get(`/medical_records/patient/${patientId}`);

        setMedicalRecords(res.data);
        sessionStorage.setItem(
          STORAGE_KEYS.MEDICAL_RECORDS,
          JSON.stringify(res.data),
        );

        return res.data;
      } catch (err) {
        setError('Failed to fetch medical records', err);
      }
    },
    [token, medicalRecords, STORAGE_KEYS],
  );

  /* -------------------- Fetch Appointments -------------------- */
  const fetchAppointment = useCallback(async () => {
    if (!token || !doctorId || !STORAGE_KEYS) return;

    if (appointment.length) return appointment;

    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/bookings/doctor/${doctorId}`);

      let list = [];
      if (Array.isArray(res.data)) list = res.data;
      else if (Array.isArray(res.data?.data)) list = res.data.data;
      else if (Array.isArray(res.data?.appointments))
        list = res.data.appointments;

      const valid = list.filter((a) => a && (a._id || a.id));

      const sorted = valid.sort(
        (a, b) =>
          new Date(b.appointment_date || b.appointmentDate || b.date) -
          new Date(a.appointment_date || a.appointmentDate || a.date),
      );

      setAppointment(sorted);
      sessionStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(sorted));

      return sorted;
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
  }, [token, doctorId, appointment, STORAGE_KEYS]);

  /* -------------------- Provider -------------------- */
  return (
    <DoctorContext.Provider
      value={{
        patients,
        fetchPatients,
        appointment,
        fetchAppointment,
        patientDetails,
        fetchPatientById,
        medicalRecords,
        getMedicalRecordById,
        loading,
        error,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;
