import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './views/Login';
import UserRegister from './views/UserRegister';
import AdminDashboard from './views/AdminDashboard';
import CreateAgent from './views/CreateAgent';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Agents from './views/Agents';
import EditAgent from './views/EditAgent';
import CreateDoctor from './views/Doctors/CreateDoctor';
import DoctorList from './views/Doctors/DoctorList'
import EditDoctor from './views/Doctors/EditDoctor';
import AnimatedBackground from './components/animatedbackground/AnimatedBackground';
import AboutUs from './views/AboutUs';
import BookAppointment from './views/BookAppointment';
import DoctorDocument from './views/DoctorDocument';
import UserDashboard from './views/UserDashboard'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // importa los estilos CSS
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
              <Route path="/admin-dashboard"
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/agents"
                element={
                  <PrivateRoute>
                    <Agents />
                  </PrivateRoute>
                }
              />
              <Route path="/create-agent"
                element={
                  <PrivateRoute>
                    <CreateAgent />
                  </PrivateRoute>
                }
              />
              <Route path="/edit-agent/:id"
                element={
                  <PrivateRoute>
                    <EditAgent />
                  </PrivateRoute>
                }
              />
              <Route path="/doctor-list"
                element={
                  <PrivateRoute>
                    <DoctorList />
                  </PrivateRoute>
                }
              />
              <Route path="/create-doctor"
                element={
                  <PrivateRoute>
                    <CreateDoctor />
                  </PrivateRoute>
                }
              />
              <Route path="/edit-doctor/:id"
                element={
                  <PrivateRoute>
                    <EditDoctor></EditDoctor>
                  </PrivateRoute>
                }
              />
              <Route path="/aboutus-view" 
                element={
                <AboutUs />
                } 
              />
              <Route path="/book-appointment"
                element={
                  <PrivateRoute>
                    <BookAppointment />
                  </PrivateRoute>
                }
              />
              <Route path="/doctor-document"
                element={
                  <PrivateRoute>
                    <DoctorDocument />
                  </PrivateRoute>
                }
              />
              <Route path="/user-dashboard"
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
