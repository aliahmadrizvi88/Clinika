import { useState } from 'react';
import { HospitalContext } from './HospitalContext';
import axios from 'axios';

const HospitalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctor, setDoctor] = useState([]);

  const fetchDoctor = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'https://doc-clinic-backend.vercel.app/api/doctors/alldoctors'
      );
      if (!response) {
        throw new Error('Failed to fetch Error');
      }
      setDoctor(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HospitalContext.Provider value={{ doctor, fetchDoctor, error, loading }}>
      {children}
    </HospitalContext.Provider>
  );
};

export default HospitalProvider;
