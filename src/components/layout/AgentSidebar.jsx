import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
import { logoutUser } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import "./StyleSidebar.css";

export default function AgentSidebar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const agentName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "Agente";

  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser();
    navigate("/login");
  };

  // Bloque usuario arriba (nombre arriba, rol abajo)
const userBlock = (
  <div className="text-center mb-4 mt-4">
    <h5 style={{ wordBreak: "break-word" }}>
      {agentName || "Agente"}
    </h5>
    <small className="text-info d-block">Agente</small>
    <hr className="text-white" />
  </div>
);



  function SidebarLinks({ onNav }) {
    return (
      <>
        <NavLink to="/agent-dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={onNav}>
          <FaHome className="me-2" /> Dashboard
        </NavLink>
        <NavLink to="/appointment-menu" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={onNav}>
          <FaCalendarAlt className="me-2" /> Citas
        </NavLink>
        <NavLink to="/patient-menu" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={onNav}>
          <FaUser className="me-2" /> Pacientes
        </NavLink>
        <hr className="text-white" />
        <a href="#" onClick={handleLogout} className="sidebar-link text-danger">
          <FaSignOutAlt className="me-2" /> Cerrar sesión
        </a>
      </>
    );
  }

  const handleNav = () => setShow(false);

  return (
    <>
      {/* Botón hamburguesa SOLO en móvil */}
      <button
        className="btn btn-primary d-md-none sidebar-hamburger"
        onClick={() => setShow(true)}
        aria-label="Abrir menú"
      >
        <FaBars />
      </button>

      {/* Sidebar fijo en escritorio */}
      <aside className="sidebar d-none d-md-flex flex-column">
        {userBlock}
        <SidebarLinks onNav={handleNav} />
      </aside>

      {/* Sidebar offcanvas en móvil */}
      {show && (
        <div className="offcanvas-sidebar" onClick={() => setShow(false)}>
          <div className="sidebar" onClick={e => e.stopPropagation()}>
            <button
              className="btn btn-outline-light mb-3 d-md-none"
              onClick={() => setShow(false)}
            >
              Cerrar
            </button>
            {userBlock}
            <SidebarLinks onNav={handleNav} />
          </div>
        </div>
      )}
    </>
  );
}
