import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './views/Auth/Login';
import UserRegister from './views/Auth/UserRegister';

// 📦 Vistas del Administrador
import AdminDashboard from './views/Admin/AdminDashboard';
import CreateAgent from './views/Admin/CreateAgent';
import Agents from './views/Admin/Agents';
import EditAgent from './views/Admin/EditAgent';
import CreateDoctor from './views/Admin/CreateDoctor';
import DoctorList from './views/Admin/DoctorList';
import EditDoctor from './views/Admin/EditDoctor';
import ManageSpecialties from './views/Admin/ManageSpecialties';

// 📦 Vistas del Agente
import AgentDashboard from './views/Agent/AgentDashboard';
import BookAppointment from './views/Agent/BookAppointment';
import DoctorDocument from './views/Agent/DoctorDocument';

// 📦 Otras vistas
import AboutUs from './views/AboutUs';
import UserDashboard from './views/UserDashboard';
import AnimatedBackground from './components/animatedbackground/AnimatedBackground';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-fill">
            <AnimatedBackground/>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<UserRegister />} />
              <Route path="/admin-dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
              <Route path="/agent-dashboard" element={<PrivateRoute role="agent"><AgentDashboard /></PrivateRoute>} />
              <Route path="/agents" element={<PrivateRoute role="admin"><Agents /></PrivateRoute>} />
              <Route path="/create-agent" element={<PrivateRoute role="admin"><CreateAgent /></PrivateRoute>} />
              <Route path="/edit-agent/:id" element={<PrivateRoute role="admin"><EditAgent /></PrivateRoute>} />
              <Route path="/doctor-list" element={<PrivateRoute role="admin"><DoctorList /></PrivateRoute>} />
              <Route path="/create-doctor" element={<PrivateRoute role="admin"><CreateDoctor /></PrivateRoute>} />
              <Route path="/edit-doctor/:id" element={<PrivateRoute role="admin"><EditDoctor /></PrivateRoute>} />
              <Route path="/manage-specialties" element={<PrivateRoute role="admin"><ManageSpecialties /></PrivateRoute>} />
              <Route path="/aboutus-view" element={<AboutUs />} />
              <Route path="/book-appointment" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
              <Route path="/doctor-document" element={<PrivateRoute><DoctorDocument /></PrivateRoute>} />
              <Route path="/user-dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
