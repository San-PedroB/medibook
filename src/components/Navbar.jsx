import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Navbar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/login"); // Redirige al login después del logout
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="medibooklogox.png" className="logo-img" alt="logo-medibook"/> 
        </Link>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
            {!user && //si el user NO esta logeado se muestra el login y registro
             (<> 
            <li className="nav-item mx-2">
              <Link className="nav-link btn-outline-primary" to="/">Login</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/register">Registro</Link>
            </li>
            </>)}

            {user && ( //si el user esta logeado se muestra el Cerrar sesión
        <button onClick={handleLogout} className="btn btn-danger ms-2">
          Cerrar sesión
        </button>
)}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
