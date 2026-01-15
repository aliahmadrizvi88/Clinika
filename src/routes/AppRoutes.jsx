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

//Auth Routes
import DocSignIn from '../pages/Doctor/auth/DocSignIn';
import DocSignUp from '../pages/Doctor/auth/DocSignUp';

//Layouts
import PatientLayout from '../layouts/PatientLayout';
import DoctorLayout from '../layouts/DoctorLayout';

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
      <Route path="/doctor-side" element={<DoctorLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="list" element={<PatientList />} />
        <Route path="profile" element={<DoctorProfile />} />
      </Route>

      {/* Auth Routes */}

      <Router path="/auth"></Router>
    </Routes>
  );
};

export default AppRoutes;
