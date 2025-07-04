import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">
          <img src="medibooklogox.png" className="logo-img" alt="logo-medibook" />
        </Link>

        {/* Menú IZQUIERDA (Agenda tu cita, Sobre nosotros) */}
        <ul className="navbar-nav d-flex flex-row">
          <li className="nav-item ms-5">
            <Link className="nav-link btn-outline-light" to="/aboutus-view">Sobre Nosotros</Link>
          </li>
        </ul>

        {/* Menú DERECHA (Login, Registro, Dashboards, Cerrar sesión) */}
        <ul className="navbar-nav d-flex flex-row ms-auto">
          {!user && (
            <>
              <li className="nav-item ms-3">
                <Link className="nav-link btn-outline-light" to="/login">Login</Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link btn-outline-light" to="/register">Registro</Link>
              </li>
            </>
          )}

          {user?.role === 'admin' && (
            <li className="nav-item ms-3">
              <Link className="nav-link btn-outline-light" to="/admin-dashboard">Dashboard</Link>
            </li>
          )}

          {user?.role === 'agent' && (
            <li className="nav-item ms-3">
              <Link className="nav-link btn-outline-light" to="/agent-dashboard">Dashboard Agente</Link>
            </li>
          )}

          {user && (
            <li className="nav-item ms-3">
              <button onClick={handleLogout} className="btn btn-danger">Cerrar sesión</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
