
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/firebaseConfig";
import { getCurrentUserData } from "../services/userService";
import { onAuthStateChanged } from "firebase/auth";

function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const data = await getCurrentUserData();
      if (data) setAdminData(data);
    } else {
      navigate("/login");
    }
  });

  return () => unsubscribe();
}, [navigate]);

  if (!adminData) {
    return <div className="container mt-5">Cargando datos del administrador...</div>;
  }

  return (
  <>
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>
          Bienvenido, <span className="text-primary">{adminData.name}</span>
        </h2>
        <p className="lead">
          Empresa: <strong>{adminData.companyName}</strong>
        </p>
      </div>

      <div className="row g-4">
        {/* Sección Agentes */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Agentes</h5>
              <p className="card-text">Gestiona tus agentes y asigna roles.</p>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/create-agent")}
                >
                  Crear Agente
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/agents")}
                >
                  Ver Agentes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Médicos */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Médicos</h5>
              <p className="card-text">Registra y edita personal médico.</p>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/create-doctor")}
                >
                  Crear Médico
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/doctor-list")}
                >
                  Ver Médicos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Citas */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Citas</h5>
              <p className="card-text">Administra las citas agendadas.</p>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/appointments")}
                >
                  Ver Citas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">{/* espacio futuro */}</div>
    </div>
  </>
);



}

export default AdminDashboard;
