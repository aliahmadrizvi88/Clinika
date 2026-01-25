import { useState, useEffect, useCallback, useMemo } from 'react';
import { DoctorContext } from './DoctorContext';
import { useAuth } from '../Auth/DoctorAuth/useAuth';
import api from '../../api/api';

const DoctorProvider = ({ children }) => {
  const { token, doctor } = useAuth();

  const doctorId =
    typeof doctor === 'string' ? doctor : doctor?.id || doctor?._id;

  /* ===================== STATE ===================== */
  const [patients, setPatients] = useState([]);
  const [patientDetails, setPatientDetails] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ===================== STORAGE KEYS ===================== */
  const STORAGE_KEYS = useMemo(() => {
    if (!doctorId) return null;

    return {
      PATIENTS: `doctor_${doctorId}_patients`,
      APPOINTMENTS: `doctor_${doctorId}_appointments`,
      PATIENT_DETAILS: `doctor_${doctorId}_patient_details`,
      MEDICAL_RECORDS: `doctor_${doctorId}_medical_records`,
    };
  }, [doctorId]);

  /* ===================== RESTORE SESSION ===================== */
  useEffect(() => {
    if (!token || !STORAGE_KEYS) return;

    const patients = sessionStorage.getItem(STORAGE_KEYS.PATIENTS);
    const appointments = sessionStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    const patientDetails = sessionStorage.getItem(STORAGE_KEYS.PATIENT_DETAILS);
    const medicalRecords = sessionStorage.getItem(STORAGE_KEYS.MEDICAL_RECORDS);

    if (patients) setPatients(JSON.parse(patients));
    if (appointments) setAppointment(JSON.parse(appointments));
    if (patientDetails) setPatientDetails(JSON.parse(patientDetails));
    if (medicalRecords) setMedicalRecords(JSON.parse(medicalRecords));
  }, [token, STORAGE_KEYS]);

  /* ===================== CLEAR ON LOGOUT ===================== */
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

  /* ===================== FETCH PATIENTS ===================== */
  const fetchPatients = useCallback(async () => {
    if (!token || !STORAGE_KEYS) return [];

    setLoading(true);
    setError(null);

    try {
      const res = await api.get('/patients/allpatients');
      const list = Array.isArray(res.data) ? res.data : [];
      setPatients(list);
      sessionStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(list));
      return list;
    } catch (err) {
      setError('Failed to fetch patients', err);
      setPatients([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [token, STORAGE_KEYS]);

  /* ===================== LOAD PATIENT DETAILS ===================== */
  const loadPatientDetails = useCallback(
    async (patientId) => {
      if (!token || !patientId || !STORAGE_KEYS) return null;

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
        setError('Failed to load patient details', err);
        setPatientDetails(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token, STORAGE_KEYS],
  );

  /* ===================== MEDICAL RECORDS (PATIENT-BASED) ===================== */
  const getMedicalRecordById = useCallback(
    async (patientId) => {
      if (!token || !patientId || !STORAGE_KEYS) return [];

      setLoading(true);
      setError(null);

      try {
        const res = await api.get(`/medical_records/patient/${patientId}`);
        const list = Array.isArray(res.data) ? res.data : [];
        setMedicalRecords(list);
        sessionStorage.setItem(
          STORAGE_KEYS.MEDICAL_RECORDS,
          JSON.stringify(list),
        );
        return list;
      } catch (err) {
        setError('Failed to fetch medical records', err);
        setMedicalRecords([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token, STORAGE_KEYS],
  );

  /* ===================== APPOINTMENTS ===================== */
  const fetchAppointment = useCallback(async () => {
    if (!token || !doctorId || !STORAGE_KEYS) return [];

    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/bookings/doctor/${doctorId}`);

      let list = [];
      if (Array.isArray(res.data)) list = res.data;
      else if (Array.isArray(res.data?.data)) list = res.data.data;

      setAppointment(list);
      sessionStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(list));
      return list;
    } catch (err) {
      setError('Failed to fetch appointments', err);
      setAppointment([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [token, doctorId, STORAGE_KEYS]);

  /* ===================== PROVIDER ===================== */
  return (
    <DoctorContext.Provider
      value={{
        patients,
        fetchPatients,
        appointment,
        fetchAppointment,
        patientDetails,
        loadPatientDetails,
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
