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
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [doctorProfile, setDoctorProfile] = useState(null);
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

    try {
      const cachedPatients = sessionStorage.getItem(STORAGE_KEYS.PATIENTS);
      const cachedAppointments = sessionStorage.getItem(
        STORAGE_KEYS.APPOINTMENTS,
      );
      const cachedPatientDetails = sessionStorage.getItem(
        STORAGE_KEYS.PATIENT_DETAILS,
      );
      const cachedRecords = sessionStorage.getItem(
        STORAGE_KEYS.MEDICAL_RECORDS,
      );

      if (cachedPatients) setPatients(JSON.parse(cachedPatients));
      if (cachedAppointments) setAppointment(JSON.parse(cachedAppointments));
      if (cachedPatientDetails)
        setPatientDetails(JSON.parse(cachedPatientDetails));
      if (cachedRecords) setMedicalRecords(JSON.parse(cachedRecords));
    } catch {
      sessionStorage.clear();
    }
  }, [token, STORAGE_KEYS]);

  /* ===================== CLEAR ON LOGOUT ===================== */
  useEffect(() => {
    if (token && doctor) return;

    setPatients([]);
    setAppointment([]);
    setPatientDetails(null);
    setMedicalRecords([]);
    setSelectedAppointment(null);
    setDoctorProfile(null);
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
    } catch {
      setError('Failed to fetch patients');
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
      } catch {
        setError('Failed to load patient details');
        setPatientDetails(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token, STORAGE_KEYS],
  );

  /* ===================== MEDICAL RECORDS ===================== */
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
      } catch {
        setError('Failed to fetch medical records');
        setMedicalRecords([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token, STORAGE_KEYS],
  );

  /* ===================== FETCH APPOINTMENTS (ENRICHED) ===================== */
  const fetchAppointment = useCallback(async () => {
    if (!token || !doctorId || !STORAGE_KEYS) return [];

    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/bookings/doctor/${doctorId}`);
      const list = Array.isArray(res.data) ? res.data : [];

      const enriched = await Promise.all(
        list.map(async (appt) => {
          if (!appt.patient_id) return appt;

          try {
            const patientRes = await api.get(
              `/patients/profile/${appt.patient_id}`,
            );
            return {
              ...appt,
              patient_details: patientRes.data,
            };
          } catch {
            return appt;
          }
        }),
      );

      setAppointment(enriched);
      sessionStorage.setItem(
        STORAGE_KEYS.APPOINTMENTS,
        JSON.stringify(enriched),
      );
      return enriched;
    } catch {
      setError('Failed to fetch appointments');
      setAppointment([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [token, doctorId, STORAGE_KEYS]);

  /* ===================== LOAD APPOINTMENT DETAILS ===================== */
  const loadAppointmentDetails = useCallback(
    async (appointmentId) => {
      if (!token || !appointmentId) return null;

      setLoading(true);
      setError(null);

      try {
        let appt = appointment.find((a) => a._id === appointmentId) || null;

        if (!appt) {
          const res = await api.get(`/bookings/doctor/${doctorId}`);
          appt = res.data?.find((a) => a._id === appointmentId) || null;
        }

        if (!appt) {
          setError('Appointment not found');
          return null;
        }

        if (appt.patient_id) {
          const recordsRes = await api.get(
            `/medical_records/patient/${appt.patient_id}`,
          );

          appt = {
            ...appt,
            medical_records: Array.isArray(recordsRes.data)
              ? recordsRes.data
              : [],
          };
        }

        setSelectedAppointment(appt);
        return appt;
      } catch {
        setError('Failed to load appointment details');
        setSelectedAppointment(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token, doctorId, appointment],
  );

  /* ===================== FETCH DOCTOR PROFILE ===================== */
  const fetchDoctorProfile = useCallback(async () => {
    if (!token || !doctorId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/doctors/profile/${doctorId}`);
      setDoctorProfile(res.data || null);
    } catch {
      setError('Failed to load doctor profile');
    } finally {
      setLoading(false);
    }
  }, [token, doctorId]);

  /* ===================== BOOK APPOINTMENT ===================== */
  const bookAppointment = async (appointmentData) => {
    try {
      const payload = {
        patient_id: appointmentData.patient_id,
        doctor_id: doctorId,

        // ✅ STRING ONLY
        appointment_date: appointmentData.appointment_date, // "2026-01-20"
        appointment_time: appointmentData.appointment_time, // "10:30"

        duration_minutes: Number(appointmentData.duration_minutes),

        // ✅ VALID ENUM VALUE
        status: 'pending',

        reason_for_visit: appointmentData.reason_for_visit || '',
        notes: appointmentData.notes || '',
      };

      console.log('📤 FINAL payload', payload);

      const res = await api.post('/bookings/new', payload);
      await fetchAppointment();

      return res.data;
    } catch (err) {
      console.error('❌ Booking error:', err.response?.data || err.message);
      throw err;
    }
  };

  /* ===================== ADD PATIENT ===================== */
  const addPatient = useCallback(
    async (patientData) => {
      if (!token) return null;

      setLoading(true);
      setError(null);

      try {
        const res = await api.post('/patients/addpatient', patientData);
        await fetchPatients();
        return res.data;
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to add patient');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchPatients],
  );

  /* ===================== PROVIDER ===================== */
  return (
    <DoctorContext.Provider
      value={{
        patients,
        fetchPatients,
        addPatient,

        patientDetails,
        loadPatientDetails,

        appointment,
        fetchAppointment,
        selectedAppointment,
        loadAppointmentDetails,
        bookAppointment,

        medicalRecords,
        getMedicalRecordById,

        doctorProfile,
        fetchDoctorProfile,

        loading,
        error,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;
