import React from "react";
import { NavLink } from "react-router-dom";

export default function ViewTest() {
  return (
    <div className="d-flex">
      {/* Sidebar del Administrador */}
      <nav className="sidebar">
        <div className="text-center mb-4">
          <img
            src="https://via.placeholder.com/80"
            alt="admin"
            className="rounded-circle mb-2"
          />
          <h5>Administrador</h5>
        </div>
        <NavLink to="/admin-dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>🏠 Dashboard</NavLink>
        <NavLink to="/doctors" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>👨‍⚕️ Médicos</NavLink>
        <NavLink to="/agents" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>🧑‍💼 Agentes</NavLink>
        <NavLink to="/manage-specialties" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>🧬 Especialidades</NavLink>
        <NavLink to="/appointments-admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>📅 Citas</NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>⚙️ Configuración</NavLink>
        <hr className="text-white" />
        <a href="#" className="text-danger">🚪 Cerrar sesión</a>
      </nav>

      <div className="flex-grow-1">
        {/* Navbar superior (solo dentro del área principal, no cubre sidebar) */}
        <header className="topbar d-flex justify-content-between align-items-center px-4 py-3 shadow-sm bg-white">
          <div className="d-flex align-items-center gap-3">
            <img src="https://via.placeholder.com/40" className="rounded-circle" alt="profile" />
            <h6 className="mb-0">Super Admin</h6>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted">Dashboard</span>
          </div>
        </header>

        {/* Contenido Principal */}
        <div className="main-content">
          <div className="content-box">
            <h2 className="mb-4">Dashboard</h2>
            <p className="text-muted">Aquí se mostrará el resumen general de la empresa.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .topbar {
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .sidebar {
          width: 300px;
          height: 100vh;
          background-color: #2c3e50;
          color: white;
          padding: 1rem;
          display: flex;
          flex-direction: column;
        }
        .sidebar a,
        .sidebar .nav-link {
          color: white;
          text-decoration: none;
          display: block;
          margin: 0.5rem 0;
          padding: 0.5rem;
          border-radius: 0.25rem;
        }
        .sidebar .nav-link.active {
          background-color: #117a8b;
          font-weight: bold;
        }
        .main-content {
          padding: 1.5rem 2rem;
          width: 100%;
          background-color: #f5f6fa;
        }
        .content-box {
          background-color: white;
          border-radius: 0.5rem;
          padding: 2rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
}
