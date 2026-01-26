import { Routes, Route } from 'react-router-dom';

//Patient Routes
import Home from '../pages/Patient/Home';
import DoctorPortfolio from '../pages/Patient/DoctorPortfolio';
import Blog from '../pages/Patient/Blog';
import Contact from '../pages/Patient/Contact';

//Doctor Routes
import Dashboard from '../pages/Doctor/Dashboard';
import PatientList from '../pages/Doctor/PatientList';
import DoctorProfile from '../pages/Doctor/DoctorProfile';
import Appointment from '../pages/Doctor/Appointment';
import PatientDetails from '../pages/Doctor/PatientDetails';
import AppointmentDetails from '../pages/Doctor/AppointmentDetails';

//Auth Routes
import DocSignIn from '../pages/Doctor/auth/DocSignIn';
import DocSignUp from '../pages/Doctor/auth/DocSignUp';

//Layouts
import PatientLayout from '../layouts/PatientLayout';
import DoctorLayout from '../layouts/DoctorLayout';
import AuthLayout from '../layouts/AuthLayout';

import DoctorGuard from '../guards/DoctorGuard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Patient Routes */}
      <Route path="/" element={<PatientLayout />}>
        <Route index element={<Home />} />
        <Route path="/doctors" element={<DoctorPortfolio />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Doctor Routes */}
      <Route element={<DoctorGuard />}>
        <Route path="/doctor-side" element={<DoctorLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="list" element={<PatientList />} />
          <Route path="list/:id" element={<PatientDetails />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="appointment/:id" element={<AppointmentDetails />} />
        </Route>
      </Route>

      {/* Auth Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="doc-signIn" element={<DocSignIn />} />
        <Route path="doc-signUp" element={<DocSignUp />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
