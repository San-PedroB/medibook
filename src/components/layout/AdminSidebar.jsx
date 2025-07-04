// src/components/layout/AdminSidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userService";

export default function AdminSidebar() {
  const navigate = useNavigate();

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
          alt="Administrador"
          className="rounded-circle mb-2"
        />
        <h5>Administrador</h5>
      </div>

      <NavLink to="/admin-dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        🏠 Dashboard
      </NavLink>
      <NavLink to="/doctor-menu" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        👨‍⚕️ Médicos
      </NavLink>
      <NavLink to="/agent-menu" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        🧑‍💼 Agentes
      </NavLink>
      <NavLink to="/manage-specialties" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        🧬 Especialidades
      </NavLink>
      <NavLink to="/appointments-calendar" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        📅 Citas
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        ⚙️ Configuración
      </NavLink>

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
