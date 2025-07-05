import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaUserMd, FaStethoscope, FaCalendarAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import { logoutUser } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import "./StyleSidebar.css";

export default function AdminSidebar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const adminName = user ? `${user.firstName || ""} ${user.lastNameP || ""}`.trim() : "Administrador";


  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser();
    navigate("/login");
  };

  const userBlock = (
    <div className="text-center mb-4 mt-4">
      <h5 style={{ wordBreak: "break-word" }}>
        {adminName || "Administrador"} 
      </h5>
      <small className="text-info d-block">Administrador</small>
      <hr className="text-white" />
    </div>
  );

  // Links con rutas y nuevos íconos FontAwesome
  function SidebarLinks({ onNav }) {
    return (
      <>
        <NavLink to="/admin-dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={onNav}>
          <FaHome className="me-2" /> Dashboard
        </NavLink>
        <NavLink to="/agent-menu" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={onNav}>
          <FaUsers className="me-2" /> Agentes
        </NavLink>
        <NavLink to="/doctor-menu" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={onNav}>
          <FaUserMd className="me-2" /> Médicos
        </NavLink>
        <NavLink to="/manage-specialties" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={onNav}>
          <FaStethoscope className="me-2" /> Especialidades
        </NavLink>
        <NavLink to="/appointments-calendar" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} onClick={onNav}>
          <FaCalendarAlt className="me-2" /> Citas
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
      {/* Hamburguesa en móvil */}
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
