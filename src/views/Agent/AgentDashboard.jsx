import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUserData } from "../../services/userService";

// Iconos
import { FaCalendarCheck, FaUserInjured, FaCalendarAlt } from "react-icons/fa";

// Animaciones
import { motion } from "framer-motion";

function AgentDashboard() {
  const [agentData, setAgentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getCurrentUserData();
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

  // Animaciones para tarjetas
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div>
      {/* Encabezado animado */}
      <motion.div
        className="bg-primary text-white p-4 rounded-4 shadow-sm mb-5 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-2">
          Bienvenido,{" "}
          <span className="text-primary fw-semibold">{agentData.name}</span>
        </h2>
        <p className="text-white">
          Panel del agente de:{" "}
          <strong>{agentData.companyName}</strong>
        </p>
      </motion.div>

      {/* Tarjetas con animación */}
      <div
        className="dashboard-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Citas */}
        <motion.div
          className="card shadow-sm border-0 rounded-4 h-100"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="card-body text-center">
            <FaCalendarCheck size={32} className="text-primary mb-2" />
            <h5 className="card-title fw-semibold">Mis Citas</h5>
            <p className="text-muted small">Ver y agendar tus citas</p>
            <div className="d-grid gap-2 mt-3">
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
        </motion.div>

        {/* Pacientes */}
        <motion.div
          className="card shadow-sm border-0 rounded-4 h-100"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="card-body text-center">
            <FaUserInjured size={32} className="text-success mb-2" />
            <h5 className="card-title fw-semibold">Pacientes</h5>
            <p className="text-muted small">Gestiona tu lista de pacientes</p>
            <div className="d-grid gap-2 mt-3">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/patient-list-view")}
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
        </motion.div>

        {/* Calendario */}
        <motion.div
          className="card shadow-sm border-0 rounded-4 h-100"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="card-body text-center">
            <FaCalendarAlt size={32} className="text-danger mb-2" />
            <h5 className="card-title fw-semibold">Calendario de Citas</h5>
            <p className="text-muted small">Visualiza todas tus citas agendadas</p>
            <div className="d-grid gap-2 mt-3">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/appointments-calendar")}
              >
                Ver Calendario
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AgentDashboard;
