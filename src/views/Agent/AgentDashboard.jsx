import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUserData } from "../../services/userService"; // por ahora reutilizamos este

function AgentDashboard() {
  const [agentData, setAgentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getCurrentUserData(); 
        // luego crearás getCurrentAgentData, pero por ahora te trae name, companyName, role…
        if (data && data.role === "agent") setAgentData(data);
        else navigate("/login");
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (!agentData) {
    return <div className="container mt-5">Cargando datos del agente...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>
          Bienvenido, <span className="text-primary">{agentData.name}</span>
        </h2>
        <p className="lead">
          Empresa: <strong>{agentData.companyName}</strong>
        </p>
      </div>

      <div className="row g-4">
        {/* Sección Citas */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Mis Citas</h5>
              <p className="card-text">Ver y agendar tus citas</p>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/appointments")}
                >
                  Ver Citas
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/create-appointment")}
                >
                  Nueva Cita
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Pacientes */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Pacientes</h5>
              <p className="card-text">Gestiona tu lista de pacientes</p>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/patients")}
                >
                  Ver Pacientes
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/create-patient")}
                >
                  Añadir Paciente
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección Perfil */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Calendario de citas</h5>
              <p className="card-text">asdasd descripcion asdasd</p>
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={() => navigate("/appointments-calendar")}>Ver Calendario</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentDashboard;
