// src/App.js
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import AdminLayout from './components/layout/AdminLayout';
import AgentLayout from './components/layout/AgentLayout';
import Loader from "./components/Loader";
import AnimatedBackground from './components/animatedbackground/AnimatedBackground';
import { useEffect, useState } from "react";

//  Vistas públicas
import Login from './views/Auth/Login';
import UserRegister from './views/Auth/UserRegister';
import AboutUs from './views/AboutUs';
import ViewTest from './views/ViewTest';

//  Vistas Admin
import AdminDashboard from './views/Admin/AdminDashboard';
import CreateAgent from './views/Admin/CreateAgent';
import AgentList from './views/Admin/AgentList';
import CreateDoctor from './views/Admin/CreateDoctor';
import DoctorList from './views/Admin/DoctorList';
import ManageSpecialties from './views/Admin/ManageSpecialties';
import DoctorMenu from './views/Admin/DoctorMenu';
import AgentMenu from './views/Admin/AgentMenu';
import EditAgent from './views/Admin/EditAgent';
import EditDoctor from './views/Admin/EditDoctor';

//  Vistas Agente
import AgentDashboard from './views/Agent/AgentDashboard';
import BookAppointment from './views/Agent/BookAppointment';
import DoctorDocument from './views/Agent/DoctorDocument';
import AppointmentsCalendar from "./views/Agent/AppointmentsCalendar";
import CreatePatientView from './views/Patients/CreatePatientView';
import PatientListView from './views/Patients/PatientListView';
import EditPatientView from './views/Patients/EditPatientView';
import UserDashboard from './views/UserDashboard';
import PatientMenu from './views/Agent/PatientMenu';
import AppointmentMenu from './views/Agent/appointmentMenu';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function AppRoutesWithLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Loader visible={loading} />
      <AnimatedBackground />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><UserRegister /></PublicRoute>} />
        <Route path="/aboutus-view" element={<AboutUs />} />
        <Route path="/view-test" element={<ViewTest />} />
        
        {/* Admin */}
        <Route path="/admin-dashboard" element={<PrivateRoute role="admin"><AdminLayout><AdminDashboard /></AdminLayout></PrivateRoute>} />
        <Route path="/agent-list" element={<PrivateRoute role="admin"><AdminLayout><AgentList /></AdminLayout></PrivateRoute>} />
        <Route path="/create-agent" element={<PrivateRoute role="admin"><AdminLayout><CreateAgent /></AdminLayout></PrivateRoute>} />
        <Route path="/doctor-list" element={<PrivateRoute role="admin"><AdminLayout><DoctorList /></AdminLayout></PrivateRoute>} />
        <Route path="/create-doctor" element={<PrivateRoute role="admin"><AdminLayout><CreateDoctor /></AdminLayout></PrivateRoute>} />
        <Route path="/manage-specialties" element={<PrivateRoute role="admin"><AdminLayout><ManageSpecialties /></AdminLayout></PrivateRoute>} />
        <Route path="/doctor-menu" element={<PrivateRoute role="admin"><AdminLayout><DoctorMenu /></AdminLayout></PrivateRoute>} />
        <Route path="/agent-menu" element={<PrivateRoute role="admin"><AdminLayout><AgentMenu /></AdminLayout></PrivateRoute>} />
        <Route path="/edit-doctor/:doctorId" element={<PrivateRoute role="admin"><AdminLayout><EditDoctor /></AdminLayout></PrivateRoute>} />
        <Route path="/edit-agent/:agentId" element={<PrivateRoute role="admin"><AdminLayout><EditAgent /></AdminLayout></PrivateRoute>} />

        {/* Agente */}
        <Route path="/agent-dashboard" element={<PrivateRoute role="agent"><AgentLayout><AgentDashboard /></AgentLayout></PrivateRoute>} />
        <Route path="/appointments-calendar" element={<PrivateRoute role="agent"><AgentLayout><AppointmentsCalendar /></AgentLayout></PrivateRoute>} />
        <Route path="/create-patient" element={<PrivateRoute role="agent"><AgentLayout><CreatePatientView /></AgentLayout></PrivateRoute>} />
        <Route path="/patient-list-view" element={<PrivateRoute role="agent"><AgentLayout><PatientListView /></AgentLayout></PrivateRoute>} />
        <Route path="/edit-patient-view/:patientId" element={<PrivateRoute role="agent"><AgentLayout><EditPatientView /></AgentLayout></PrivateRoute>} />
        <Route path="/book-appointment" element={<PrivateRoute role="agent"><AgentLayout><BookAppointment /></AgentLayout></PrivateRoute>} />
        <Route path="/doctor-document" element={<PrivateRoute role="agent"><AgentLayout><DoctorDocument /></AgentLayout></PrivateRoute>} />
        <Route path="/user-dashboard" element={<PrivateRoute role="agent"><AgentLayout><UserDashboard /></AgentLayout></PrivateRoute>} />
        <Route path="/patient-menu" element={<PrivateRoute role="agent"><AgentLayout><PatientMenu /></AgentLayout></PrivateRoute>} />
        <Route path="/appointment-menu" element={<PrivateRoute role="agent"><AgentLayout><AppointmentMenu /></AgentLayout></PrivateRoute>} />

        {/* 404 */}
        <Route path="*" element={<div className="text-center mt-5"><h2>Página no encontrada</h2></div>} />
      </Routes>
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
