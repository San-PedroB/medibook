import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

export default function AgentSidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const agentName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "Agente";

  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser();
    navigate("/login");
  };

  return (
    <nav className="sidebar">
      <div className="text-center mb-4">
        <img
          src="https://via.placeholder.com/80"
          alt="Agente"
          className="rounded-circle mb-2"
        />
        <h5>{agentName || "Agente"}</h5>
      </div>

      <NavLink to="/agent-dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        🏠 Dashboard
      </NavLink>
      <NavLink to="/appointment-menu" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        📅 Citas
      </NavLink>
      <NavLink to="/patient-menu" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        👤 Pacientes
      </NavLink>
      {/* Agrega aquí más links para el agente si es necesario */}

      <hr className="text-white" />

      <a href="#" onClick={handleLogout} className="sidebar-link text-danger">
        🚪 Cerrar sesión
      </a>

      <style jsx>{`
        .sidebar {
          width: 300px;
          height: 100vh;
          background-color: #2c3e50;
          color: white;
          padding: 1rem;
          display: flex;
          flex-direction: column;
        }

        .sidebar-link {
          color: white;
          text-decoration: none;
          display: block;
          margin: 0.5rem 0;
          padding: 0.5rem;
          border-radius: 0.25rem;
        }

        .sidebar-link.active {
          background-color: #117a8b;
          font-weight: bold;
        }

        .sidebar-link.text-danger {
          color: #e74c3c;
        }
      `}</style>
    </nav>
  );
}
