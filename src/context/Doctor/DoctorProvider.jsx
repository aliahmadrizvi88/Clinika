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

  // Delete Patients
  const deletePatientCascade = useCallback(
    async (patientId) => {
      if (!token || !patientId || !STORAGE_KEYS) return;

      setLoading(true);
      setError(null);

      try {
        /* 1️⃣ Fetch related records */
        const recordsRes = await api.get(
          `/medical_records/patient/${patientId}`,
        );
        const records = Array.isArray(recordsRes.data) ? recordsRes.data : [];

        const bookingsRes = await api.get('/bookings/doctor/' + doctorId);
        const bookings = Array.isArray(bookingsRes.data)
          ? bookingsRes.data
          : [];

        const patientBookings = bookings.filter(
          (b) => b.patient_id?._id === patientId,
        );

        /* 2️⃣ Delete medical records */
        await Promise.all(
          records.map((r) => api.delete(`/medical_records/delete/${r._id}`)),
        );

        /* 3️⃣ Delete appointments */
        await Promise.all(
          patientBookings.map((b) => api.delete(`/bookings/delete/${b._id}`)),
        );

        /* 4️⃣ Delete patient */
        await api.delete(`/patients/delete/${patientId}`);

        /* 5️⃣ Clear state */
        setPatientDetails(null);
        setMedicalRecords([]);

        /* 6️⃣ Refetch patients */
        const refreshed = await api.get('/patients/allpatients');
        setPatients(refreshed.data || []);

        sessionStorage.setItem(
          STORAGE_KEYS.PATIENTS,
          JSON.stringify(refreshed.data || []),
        );

        sessionStorage.removeItem(STORAGE_KEYS.PATIENT_DETAILS);
        sessionStorage.removeItem(STORAGE_KEYS.MEDICAL_RECORDS);
      } catch (err) {
        setError('Failed to delete patient completely', err);
      } finally {
        setLoading(false);
      }
    },
    [token, doctorId, STORAGE_KEYS],
  );

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

  const loadAppointmentDetails = useCallback(
    async (appointmentId) => {
      if (!token || !appointmentId) return null;

      setLoading(true);
      setError(null);

      try {
        // 1️⃣ Try from existing appointments first
        let appt = appointment.find(
          (a) => a._id === appointmentId || a.id === appointmentId,
        );

        // 2️⃣ If not found, refetch all appointments
        if (!appt) {
          const res = await api.get(`/bookings/doctor/${doctorId}`);
          const list = Array.isArray(res.data) ? res.data : [];
          appt = list.find(
            (a) => a._id === appointmentId || a.id === appointmentId,
          );
        }

        if (!appt) {
          setError('Appointment not found');
          return null;
        }

        // 3️⃣ Fetch patient details if patient_id is a string
        if (appt.patient_id && typeof appt.patient_id === 'string') {
          try {
            const patientRes = await api.get(
              `/patients/profile/${appt.patient_id}`,
            );
            appt = {
              ...appt,
              patient_details: patientRes.data,
            };
          } catch (err) {
            console.error('Failed to fetch patient for appointment:', err);
          }
        }

        // 4️⃣ Fetch medical records for this appointment
        if (appt.patient_id) {
          const patientId =
            typeof appt.patient_id === 'string'
              ? appt.patient_id
              : appt.patient_id._id;

          try {
            const recordsRes = await api.get(
              `/medical_records/patient/${patientId}`,
            );
            const records = Array.isArray(recordsRes.data)
              ? recordsRes.data
              : [];
            appt = {
              ...appt,
              medical_records: records,
            };
          } catch (err) {
            console.error('Failed to fetch medical records:', err);
          }
        }

        setSelectedAppointment(appt);
        return appt;
      } catch (err) {
        setError('Failed to load appointment details', err);
        setSelectedAppointment(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token, doctorId, appointment],
  );

  /* ===================== PROVIDER ===================== */
  return (
    <DoctorContext.Provider
      value={{
        patients,
        fetchPatients,
        patientDetails,
        loadPatientDetails,
        deletePatientCascade,

        appointment,
        fetchAppointment,
        selectedAppointment,
        loadAppointmentDetails,

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
