import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/Auth/DoctorAuth/useAuth';

const DoctorGuard = () => {
  const { isAuthenticated, token, doctor } = useAuth();

  if (!isAuthenticated || !token || !doctor) {
    sessionStorage.clear();
    return <Navigate to="/auth/doc-signIn" replace />;
  }

  return <Outlet />;
};

export default DoctorGuard;
