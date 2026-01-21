import { DoctorContext } from './DoctorContext';
import { useContext } from 'react';

export const useDoctor = () => {
  const context = useContext(DoctorContext);

  if (!context) {
    throw new Error('useHospital must be used inside HospitalProvider');
  }

  return context;
};
