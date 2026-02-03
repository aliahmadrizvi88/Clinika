import { useState } from 'react';
import { HospitalContext } from './HospitalContext';
import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

const HospitalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctor, setDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const fetchDoctor = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${URL}/doctors/alldoctors`);
      if (!response) {
        throw new Error('Failed to fetch doctors');
      }
      setDoctor(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctorById = async (doctorId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${URL}/doctors/profile/${doctorId}`);
      if (!response) {
        throw new Error('Failed to fetch doctor details');
      }
      setSelectedDoctor(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <HospitalContext.Provider
      value={{
        doctor,
        selectedDoctor,
        fetchDoctor,
        fetchDoctorById,
        error,
        loading,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export default HospitalProvider;
