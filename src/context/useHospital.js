import { HospitalContext } from './HospitalContext';
import { useContext } from 'react';

export const useHospital = () => {
  const context = useContext(HospitalContext);

  if (!context) {
    throw new Error('useHospital must be used inside HospitalProvider');
  }
  return context;
};
