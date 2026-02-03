# 🏥 Doctor Clinic Management System

A comprehensive web-based clinic management system designed to streamline medical practice operations, patient management, and appointment scheduling.

![Project Status](https://img.shields.io/badge/Status-Completed%20-green)
![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)

---

## ⚠️ **IMPORTANT NOTICE**

**This project is currently under active development and is in the fixing/testing phase.**

- 🚧 Some features may not work as expected
- 🐛 Bugs and errors are being actively identified and fixed
- 📝 Documentation is being continuously updated
- ⚡ Breaking changes may occur without prior notice
- 🔒 Not recommended for production use at this stage

**USE AT YOUR OWN RISK** - This application is not yet stable for production environments.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Backend Collaboration](#-backend-collaboration)
- [Known Issues](#-known-issues)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Contact](#-contact)

---

## ✨ Features

### For Doctors

- 🔐 **Secure Authentication** - Cookie-based authentication with protected routes
- 👥 **Patient Management** - View, add, edit, and delete patient records
- 📅 **Appointment Scheduling** - Manage appointments with real-time updates
- 📊 **Dashboard** - Overview of daily appointments and patient statistics
- 📝 **Medical Records** - Create and manage patient medical histories
- 💊 **Prescription Management** - Digital prescription creation and tracking
- 🔍 **Patient Details** - Comprehensive patient profiles with medical history
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### For Patients (Planned)

- 📅 Book appointments online
- 📋 View medical history
- 💬 Communicate with doctors
- 🔔 Appointment reminders

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** React 18
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **State Management:** Context API
- **Build Tool:** Vite

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Vercel

**Backend Repository:** [amjadkhanniazi/doc-clinic-backend](https://github.com/amjadkhanniazi)  
**Backend Deployment:** Vercel

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/doctor-clinic-frontend.git
cd doctor-clinic-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://doc-clinic-backend.vercel.app/api
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

---

## 🔧 Environment Variables

| Variable       | Description          | Required |
| -------------- | -------------------- | -------- |
| `VITE_API_URL` | Backend API base URL | Yes      |

---

## 💻 Usage

### Login as Doctor

1. Navigate to `/auth/doc-signIn`
2. Enter your credentials
3. Access the doctor dashboard

### Default Routes

- **Public Routes:**
  - `/` - Home page
  - `/doctors` - Doctor portfolio
  - `/blogs` - Blog listings
  - `/contact` - Contact page
  - `/auth/doc-signIn` - Doctor login
  - `/auth/doc-signUp` - Doctor registration

- **Protected Routes (Doctor):**
  - `/doctor-side/dashboard` - Main dashboard
  - `/doctor-side/list` - Patient list
  - `/doctor-side/list/:id` - Patient details
  - `/doctor-side/appointment` - Appointments list
  - `/doctor-side/appointment/:id` - Appointment details
  - `/doctor-side/profile` - Doctor profile

---

## 📁 Project Structure

```
doctor-clinic-frontend/
├── public/
├── src/
│   ├── api/
│   │   └── api.js                 # Axios instance & interceptors
│   ├── components/
│   │   ├── Doctor/
│   │   │   ├── Dashboard/
│   │   │   ├── PatientDetails/
│   │   │   ├── AppointmentDetails/
│   │   │   └── UniTable.jsx
│   │   └── Patient/
│   ├── context/
│   │   ├── Auth/
│   │   │   └── DoctorAuth/
│   │   │       ├── AuthContext.jsx
│   │   │       ├── AuthProvider.jsx
│   │   │       └── useAuth.js
│   │   └── Doctor/
│   │       ├── DoctorContext.jsx
│   │       ├── DoctorProvider.jsx
│   │       └── useDoctor.js
│   ├── guards/
│   │   └── DoctorGuard.jsx        # Protected route guard
│   ├── layouts/
│   │   ├── DoctorLayout.jsx
│   │   ├── PatientLayout.jsx
│   │   └── AuthLayout.jsx
│   ├── pages/
│   │   ├── Doctor/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── PatientList.jsx
│   │   │   ├── PatientDetails.jsx
│   │   │   ├── Appointment.jsx
│   │   │   ├── AppointmentDetails.jsx
│   │   │   └── DoctorProfile.jsx
│   │   └── Patient/
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

## 🤝 Backend Collaboration

This project's backend is developed and maintained by:

**Developer:** [Amjad Khan Niazi](https://github.com/amjadkhanniazi)  
**Repository:** [Backend Repository](https://github.com/amjadkhanniazi)  
**Deployment:** Vercel  
**API Base URL:** `https://doc-clinic-backend.vercel.app/api`

### API Endpoints (Main)

```
Authentication:
POST /auth/login
POST /auth/register

Patients:
GET    /patients/allpatients
GET    /patients/profile/:id
POST   /patients/create
PUT    /patients/update/:id
DELETE /patients/delete/:id

Appointments:
GET    /bookings/doctor/:doctorId
GET    /bookings/patient/:patientId
POST   /bookings/create
PUT    /bookings/update/:id
DELETE /bookings/delete/:id

Medical Records:
GET    /medical_records/patient/:patientId
POST   /medical_records/create
DELETE /medical_records/delete/:id
```

---

## 🐛 Known Issues

As this project is under active development, here are some known issues:

- [ ] Infinite API fetching on some pages (being fixed)
- [ ] Patient details not populating in appointments (in progress)
- [ ] Session management needs optimization
- [ ] Medical records accordion sometimes doesn't load
- [ ] Delete patient cascade not fully tested
- [ ] Mobile responsiveness needs improvements on some pages
- [ ] Error handling needs to be more robust

**Found a bug?** Please [open an issue](https://github.com/yourusername/doctor-clinic-frontend/issues)

---

## 🤝 Contributing

Contributions are welcome! However, please note:

1. This project is in early development
2. Major refactoring may occur
3. Your contributions might need to be updated frequently

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🗺️ Roadmap

### Phase 1: Core Functionality (Current)

- [x] Doctor authentication
- [x] Patient management
- [x] Appointment scheduling
- [x] Basic medical records
- [ ] Bug fixes and stability

### Phase 2: Enhanced Features

- [ ] Patient portal
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Advanced search and filters
- [ ] Data export functionality

### Phase 3: Advanced Features

- [ ] Video consultations
- [ ] Payment integration
- [ ] Analytics and reporting
- [ ] Mobile app
- [ ] Multi-clinic support

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Frontend Developer:** Syed Ali Ahmad Rizvi
**Email:** aliahmadrizvi88@gmail.com  
**GitHub:** [@aliahmadrizvi88](https://github.com/aliahmadrizvi88)

**Backend Developer:** Amjad Khan Niazi  
**GitHub:** [@amjadkhanniazi](https://github.com/amjadkhanniazi)

**Project Link:** [https://github.com/amjadkhanniazi/doctor-clinic-frontend](https://github.com/amjadkhanniazi/doc_clinic_backend)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vercel](https://vercel.com/)
- All contributors and testers

---
