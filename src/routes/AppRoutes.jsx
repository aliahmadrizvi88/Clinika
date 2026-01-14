import { Routes, Route } from 'react-router-dom';

//Patient Routes
import Home from '../pages/Patient/Home';
import DoctorPortfolio from '../pages/Patient/DoctorPortfolio';
import Blog from '../pages/Patient/Blog';
import Contact from '../pages/Patient/Contact';

//Layouts
import PatientLayout from '../layouts/PatientLayout';

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
      <Route path="/Doctor"></Route>
    </Routes>
  );
};

export default AppRoutes;
