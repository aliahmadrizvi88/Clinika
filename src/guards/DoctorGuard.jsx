import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/Auth/DoctorAuth/useAuth';

const DoctorGuard = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/doc-signIn" replace />;
  }

  return <Outlet />;
};

export default DoctorGuard;
