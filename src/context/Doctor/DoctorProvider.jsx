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
      DOCTOR_PROFILE: `doctor_${doctorId}_profile`,
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
      const cachedProfile = sessionStorage.getItem(STORAGE_KEYS.DOCTOR_PROFILE);

      if (cachedPatients) setPatients(JSON.parse(cachedPatients));
      if (cachedAppointments) setAppointment(JSON.parse(cachedAppointments));
      if (cachedPatientDetails)
        setPatientDetails(JSON.parse(cachedPatientDetails));
      if (cachedRecords) setMedicalRecords(JSON.parse(cachedRecords));
      if (cachedProfile) setDoctorProfile(JSON.parse(cachedProfile));
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

  /* ===================== PATIENT OPERATIONS ===================== */

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
      console.error('Error fetching patients:', err);
      setError('Failed to fetch patients');
      setPatients([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [token, STORAGE_KEYS]);

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
        console.error('Error loading patient details:', err);
        setError('Failed to load patient details');
        setPatientDetails(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token, STORAGE_KEYS],
  );

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
        console.error('❌ Add patient error:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to add patient');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchPatients],
  );

  const updatePatient = useCallback(
    async (patientId, updateData) => {
      if (!token || !patientId) return null;

      setLoading(true);
      setError(null);

      try {
        const res = await api.put(
          `/patients/updateprofile/${patientId}`,
          updateData,
        );

        setPatientDetails(res.data);
        sessionStorage.setItem(
          STORAGE_KEYS.PATIENT_DETAILS,
          JSON.stringify(res.data),
        );

        await fetchPatients();
        return res.data;
      } catch (err) {
        console.error('❌ Update patient error:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to update patient');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchPatients, STORAGE_KEYS],
  );

  const deletePatientCascade = useCallback(
    async (patientId) => {
      if (!token || !patientId || !STORAGE_KEYS) return;

      setLoading(true);
      setError(null);

      try {
        const recordsRes = await api.get(
          `/medical_records/patient/${patientId}`,
        );
        const records = Array.isArray(recordsRes.data) ? recordsRes.data : [];

        const bookingsRes = await api.get('/bookings/doctor/' + doctorId);
        const bookings = Array.isArray(bookingsRes.data)
          ? bookingsRes.data
          : [];

        const patientBookings = bookings.filter(
          (b) => b.patient_id?._id === patientId || b.patient_id === patientId,
        );

        await Promise.all(
          records.map((r) => api.delete(`/medical_records/delete/${r._id}`)),
        );

        await Promise.all(
          patientBookings.map((b) => api.delete(`/bookings/delete/${b._id}`)),
        );

        await api.delete(`/patients/delete/${patientId}`);

        setPatientDetails(null);
        setMedicalRecords([]);

        const refreshed = await api.get('/patients/allpatients');
        setPatients(refreshed.data || []);

        sessionStorage.setItem(
          STORAGE_KEYS.PATIENTS,
          JSON.stringify(refreshed.data || []),
        );
        sessionStorage.removeItem(STORAGE_KEYS.PATIENT_DETAILS);
        sessionStorage.removeItem(STORAGE_KEYS.MEDICAL_RECORDS);
      } catch (err) {
        console.error('❌ Delete patient error:', err);
        setError('Failed to delete patient completely');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, doctorId, STORAGE_KEYS],
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
      } catch (err) {
        console.error('Error fetching medical records:', err);
        setError('Failed to fetch medical records');
        setMedicalRecords([]);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [token, STORAGE_KEYS],
  );

  const addMedicalRecord = useCallback(
    async (recordData) => {
      if (!token) return null;

      setLoading(true);
      setError(null);

      try {
        const res = await api.post('/medical_records/new', recordData);

        if (recordData.patient_id) {
          await getMedicalRecordById(recordData.patient_id);
        }

        return res.data;
      } catch (err) {
        console.error('❌ Add medical record error:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to add medical record');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, getMedicalRecordById],
  );

  const updateMedicalRecord = useCallback(
    async (recordId, updateData) => {
      if (!token || !recordId) return null;

      setLoading(true);
      setError(null);

      try {
        const res = await api.patch(
          `/medical_records/update/${recordId}`,
          updateData,
        );

        if (patientDetails?._id) {
          await getMedicalRecordById(patientDetails._id);
        }

        return res.data;
      } catch (err) {
        console.error('❌ Update medical record error:', err.response?.data);
        setError(
          err.response?.data?.message || 'Failed to update medical record',
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, patientDetails, getMedicalRecordById],
  );

  const deleteMedicalRecord = useCallback(
    async (recordId) => {
      if (!token || !recordId) return null;

      setLoading(true);
      setError(null);

      try {
        await api.delete(`/medical_records/delete/${recordId}`);

        if (patientDetails?._id) {
          await getMedicalRecordById(patientDetails._id);
        }

        return true;
      } catch (err) {
        console.error('❌ Delete medical record error:', err.response?.data);
        setError(
          err.response?.data?.message || 'Failed to delete medical record',
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, patientDetails, getMedicalRecordById],
  );

  /* ===================== APPOINTMENTS ===================== */

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
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to fetch appointments');
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
      } catch (err) {
        console.error('Error loading appointment details:', err);
        setError('Failed to load appointment details');
        setSelectedAppointment(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token, doctorId, appointment],
  );

  const bookAppointment = useCallback(
    async (appointmentData) => {
      if (!token || !doctorId) return null;

      setLoading(true);
      setError(null);

      try {
        const appointmentDateTime = new Date(
          `${appointmentData.appointment_date}T${appointmentData.appointment_time}:00.000Z`,
        ).toISOString();

        const payload = {
          patient_id: appointmentData.patient_id,
          doctor_id: doctorId,
          appointment_date: appointmentData.appointment_date,
          appointment_time: appointmentDateTime,
          duration_minutes: Number(appointmentData.duration_minutes),
          status: 'Scheduled',
          reason_for_visit: appointmentData.reason_for_visit || '',
          notes: appointmentData.notes || '',
        };

        const res = await api.post('/bookings/new', payload);

        await fetchAppointment();
        return res.data;
      } catch (err) {
        console.error('❌ Booking error:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Failed to book appointment');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, doctorId, fetchAppointment],
  );

  const updateAppointment = useCallback(
    async (appointmentId, updateData) => {
      if (!token || !appointmentId) return null;

      setLoading(true);
      setError(null);

      try {
        const res = await api.patch(
          `/bookings/update/${appointmentId}`,
          updateData,
        );

        await fetchAppointment();

        if (selectedAppointment?._id === appointmentId) {
          setSelectedAppointment(res.data);
        }

        return res.data;
      } catch (err) {
        console.error('❌ Update appointment error:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to update appointment');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchAppointment, selectedAppointment],
  );

  const cancelAppointment = useCallback(
    async (appointmentId) => {
      if (!token || !appointmentId) return null;

      setLoading(true);
      setError(null);

      try {
        const res = await api.patch(`/bookings/update/${appointmentId}`, {
          status: 'Cancelled',
        });

        await fetchAppointment();

        if (selectedAppointment?._id === appointmentId) {
          setSelectedAppointment({
            ...selectedAppointment,
            status: 'Cancelled',
          });
        }

        return res.data;
      } catch (err) {
        console.error('❌ Cancel appointment error:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to cancel appointment');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchAppointment, selectedAppointment],
  );

  const completeAppointment = useCallback(
    async (appointmentId) => {
      if (!token || !appointmentId) return null;

      setLoading(true);
      setError(null);

      try {
        const res = await api.patch(`/bookings/update/${appointmentId}`, {
          status: 'Completed',
        });

        await fetchAppointment();

        if (selectedAppointment?._id === appointmentId) {
          setSelectedAppointment({
            ...selectedAppointment,
            status: 'Completed',
          });
        }

        return res.data;
      } catch (err) {
        console.error('❌ Complete appointment error:', err.response?.data);
        setError(
          err.response?.data?.message || 'Failed to complete appointment',
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchAppointment, selectedAppointment],
  );

  const deleteAppointment = useCallback(
    async (appointmentId) => {
      if (!token || !appointmentId) return null;

      setLoading(true);
      setError(null);

      try {
        await api.delete(`/bookings/delete/${appointmentId}`);

        await fetchAppointment();

        if (selectedAppointment?._id === appointmentId) {
          setSelectedAppointment(null);
        }

        return true;
      } catch (err) {
        console.error('❌ Delete appointment error:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to delete appointment');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchAppointment, selectedAppointment],
  );

  /* ===================== DOCTOR PROFILE ===================== */

  const fetchDoctorProfile = useCallback(async () => {
    if (!token || !doctorId || !STORAGE_KEYS) return null;

    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/doctors/profile/${doctorId}`);
      setDoctorProfile(res.data || null);
      sessionStorage.setItem(
        STORAGE_KEYS.DOCTOR_PROFILE,
        JSON.stringify(res.data),
      );
      return res.data;
    } catch (err) {
      console.error('Error fetching doctor profile:', err);
      setError('Failed to load doctor profile');
      return null;
    } finally {
      setLoading(false);
    }
  }, [token, doctorId, STORAGE_KEYS]);

  const updateDoctorProfile = useCallback(
    async (updateData) => {
      if (!token || !doctorId || !STORAGE_KEYS) return null;

      setLoading(true);
      setError(null);

      try {
        const res = await api.put(
          `/doctors/updateprofile/${doctorId}`,
          updateData,
        );

        setDoctorProfile(res.data);
        sessionStorage.setItem(
          STORAGE_KEYS.DOCTOR_PROFILE,
          JSON.stringify(res.data),
        );
        return res.data;
      } catch (err) {
        console.error('❌ Update doctor profile error:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to update profile');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, doctorId, STORAGE_KEYS],
  );

  /* ===================== PROVIDER ===================== */
  return (
    <DoctorContext.Provider
      value={{
        // Patients
        patients,
        fetchPatients,
        addPatient,
        patientDetails,
        loadPatientDetails,
        updatePatient,
        deletePatientCascade,

        // Medical Records
        medicalRecords,
        getMedicalRecordById,
        addMedicalRecord,
        updateMedicalRecord,
        deleteMedicalRecord,

        // Appointments
        appointment,
        fetchAppointment,
        bookAppointment,
        selectedAppointment,
        loadAppointmentDetails,
        updateAppointment,
        cancelAppointment,
        completeAppointment,
        deleteAppointment,

        // Doctor Profile
        doctorProfile,
        fetchDoctorProfile,
        updateDoctorProfile,

        // State
        loading,
        error,
        setError,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;
