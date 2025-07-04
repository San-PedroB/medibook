// src/App.js
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import RoleBasedLayout from './components/layout/RoleBasedLayout';
import AnimatedBackground from './components/animatedbackground/AnimatedBackground';
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

// 🧩 Vistas públicas
import Login from './views/Auth/Login';
import UserRegister from './views/Auth/UserRegister';
import AboutUs from './views/AboutUs';
import ViewTest from './views/ViewTest';

// 📦 Vistas Admin
import AdminDashboard from './views/Admin/AdminDashboard';
import CreateAgent from './views/Admin/CreateAgent';
import AgentList from './views/Admin/AgentList';
import CreateDoctor from './views/Admin/CreateDoctor';
import DoctorList from './views/Admin/DoctorList';
import ManageSpecialties from './views/Admin/ManageSpecialties';
import DoctorMenu from './views/Admin/DoctorMenu';
import AgentMenu from './views/Admin/AgentMenu';
import EditAgent from './views/Admin/EditAgent';

// 📦 Vistas Agente
import AgentDashboard from './views/Agent/AgentDashboard';
import BookAppointment from './views/Agent/BookAppointment';
import DoctorDocument from './views/Agent/DoctorDocument';
import AppointmentsCalendar from "./views/Agent/AppointmentsCalendar";
import CreatePatientView from './views/Patients/CreatePatientView';
import PatientListView from './views/Patients/PatientListView';
import EditPatientView from './views/Patients/EditPatientView';
import EditDoctor from './views/Admin/EditDoctor';
import UserDashboard from './views/UserDashboard';
import PatientMenu from './views/Agent/PatientMenu';
import AppointmentMenu from './views/Agent/appointmentMenu';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 🔓 Rutas públicas
function PublicRoutes() {
  const location = useLocation();
  const hideLayoutRoutes = ["/view-test"];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/aboutus-view" element={<AboutUs />} />
      <Route path="/view-test" element={<ViewTest />} />
    </Routes>
  );
}

// 🔐 Rutas protegidas, envueltas con layout dinámico según el rol
function ProtectedRoutes() {
  return (
    <RoleBasedLayout>
      <Routes>
        {/* Admin */}
        <Route path="/admin-dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/agent-list" element={<PrivateRoute role="admin"><AgentList /></PrivateRoute>} />
        <Route path="/create-agent" element={<PrivateRoute role="admin"><CreateAgent /></PrivateRoute>} />
        <Route path="/doctor-list" element={<PrivateRoute role="admin"><DoctorList /></PrivateRoute>} />
        <Route path="/create-doctor" element={<PrivateRoute role="admin"><CreateDoctor /></PrivateRoute>} />
        <Route path="/manage-specialties" element={<PrivateRoute role="admin"><ManageSpecialties /></PrivateRoute>} />
        <Route path="/doctor-menu" element={<PrivateRoute role="admin"><DoctorMenu /></PrivateRoute>} />
        <Route path="/agent-menu" element={<PrivateRoute role="admin"><AgentMenu /></PrivateRoute>} />
        <Route path="/edit-doctor/:doctorId" element={<PrivateRoute role="admin"><EditDoctor /></PrivateRoute>} />
        <Route path="/edit-agent/:agentId" element={<PrivateRoute role="admin"><EditAgent /></PrivateRoute>} />


        {/* Agente */}
        <Route path="/agent-dashboard" element={<PrivateRoute role="agent"><AgentDashboard /></PrivateRoute>} />
        <Route path="/appointments-calendar" element={<PrivateRoute role="agent"><AppointmentsCalendar /></PrivateRoute>} />
        <Route path="/create-patient" element={<PrivateRoute role="agent"><CreatePatientView /></PrivateRoute>} />
        <Route path="/patient-list-view" element={<PrivateRoute role="agent"><PatientListView /></PrivateRoute>} />
        <Route path="/edit-patient-view/:patientId" element={<PrivateRoute role="agent"><EditPatientView /></PrivateRoute>} />
        <Route path="/book-appointment" element={<PrivateRoute role="agent"><BookAppointment /></PrivateRoute>} />
        <Route path="/doctor-document" element={<PrivateRoute role="agent"><DoctorDocument /></PrivateRoute>} />
        <Route path="/user-dashboard" element={<PrivateRoute role="agent"><UserDashboard /></PrivateRoute>} />
        <Route path="/patient-menu" element={<PrivateRoute role="agent"><PatientMenu /></PrivateRoute>} />
        <Route path="/appointment-menu" element={<PrivateRoute role="agent"><AppointmentMenu /></PrivateRoute>} />

      </Routes>
    </RoleBasedLayout>
  );
}

// 👇 Este componente controla el loader por cambio de ruta
function AppRoutesWithLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Loader visible={loading} />
      <AnimatedBackground />
      <PublicRoutes />
      <ProtectedRoutes />
    </>
  );
}


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutesWithLoader />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
