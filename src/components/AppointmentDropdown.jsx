import React from "react";
import { Link } from "react-router-dom";

function AppointmentDropdown() {
  return (
    <li className="nav-item dropdown ms-5">
      <a
        className="nav-link dropdown-toggle btn-outline-light"
        href="#"
        id="appointmentDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Agenda tu Cita
      </a>
      <ul className="dropdown-menu bg-primary border-0 shadow rounded-3" aria-labelledby="appointmentDropdown">
        <li><Link className="dropdown-item nav-link text-white" to="/book-appointment">Medicina General</Link></li>
        <li><Link className="dropdown-item nav-link text-white" to="/book-appointment">Especialidades Médicas Avanzadas</Link></li>
        <li><Link className="dropdown-item nav-link text-white" to="/book-appointment">Psicología y Bienestar Mental</Link></li>
        <li><Link className="dropdown-item nav-link text-white" to="/book-appointment">Atención Pediátrica</Link></li>
        <li><Link className="dropdown-item nav-link text-white" to="/book-appointment">Salud Femenina</Link></li>
        <li><Link className="dropdown-item nav-link text-white" to="/book-appointment">Salud Masculina</Link></li>
        <li><Link className="dropdown-item nav-link text-white" to="/book-appointment">Cuidado Dental</Link></li>
        <li><Link className="dropdown-item nav-link text-white" to="/book-appointment">Terapias y Rehabilitación Física</Link></li>
        <li><Link className="dropdown-item nav-link text-white" to="/book-appointment">Exámenes Médicos y Laboratorio</Link></li>
        <li><Link className="dropdown-item nav-link text-white" to="/book-appointment">Otras Especialidades</Link></li>
      </ul>
    </li>
  );
}

export default AppointmentDropdown;
