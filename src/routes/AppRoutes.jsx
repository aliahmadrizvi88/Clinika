import { Routes, Route } from 'react-router-dom';

//Patient Routes
import Home from '../pages/Patient/Home';
import DoctorPortfolio from '../pages/Patient/DoctorPortfolio';
import Blog from '../pages/Patient/Blog';
import About from '../pages/Patient/About';

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
        <Route path="/about" element={<About />} />
      </Route>

      {/* Doctor Routes */}
      <Route path="/Doctor"></Route>
    </Routes>
  );
};

export default AppRoutes;
