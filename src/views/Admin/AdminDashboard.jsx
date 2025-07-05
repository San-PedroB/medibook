// src/views/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUserData } from "../../services/userService";

import { FaUsers, FaUserMd, FaStethoscope, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

import DashboardHeader from "../../components/layout/DashboardHeader";

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getCurrentUserData();
        if (data) setAdminData(data);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (!adminData) {
    return (
      <div className="container mt-5">
        Cargando datos del administrador...
      </div>
    );
  }

  // Variantes definidas *inline* para las tarjetas
  const cardVariants = {
    hidden:   { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cards = [
    {
      icon: <FaUsers size={32} className="text-success mb-2" />,      title: "Agentes",
      desc: "Gestiona tus agentes y asigna roles.",
      buttons: [
        { text: "Crear Agente", variant: "outline-primary", onClick: () => navigate("/create-agent") },
        { text: "Ver Agentes"  , variant: "primary",         onClick: () => navigate("/agents") },
      ],
    },
    {
      icon: <FaUserMd size={32} className="text-primary mb-2" />,
      title: "Médicos",
      desc: "Registra y edita personal médico.",
      buttons: [
        { text: "Crear Médico", variant: "outline-primary", onClick: () => navigate("/create-doctor") },
        { text: "Ver Médicos" , variant: "primary",          onClick: () => navigate("/doctor-list") },
      ],
    },
    {
      icon: <FaStethoscope size={32} className="text-info mb-2" />,
      title: "Especialidades",
      desc: "Define las especialidades de tu clínica.",
      buttons: [
        { text: "Gestionar Especialidades", variant: "primary", onClick: () => navigate("/manage-specialties") },
      ],
    },
    {
      icon: <FaCalendarAlt size={32} className="text-danger mb-2" />,
      title: "Calendario de Citas",
      desc: "Administra las citas agendadas.",
      buttons: [
        { text: "Ver Citas", variant: "outline-primary", onClick: () => navigate("/admin-appointments") },
      ],
    },
  ];

  return (
    <div className="container-fluid px-4">
      {/* Header reutilizable (animación interna en DashboardHeader) */}
      <DashboardHeader
        greeting="Bienvenido"
        name={adminData.name}
        subText="Panel de administración de:"
        companyName={adminData.companyName}
      />

      {/* Responsive grid con Bootstrap */}
      <div className="row mt-4">
        {cards.map((card, index) => (
          <div
            className="col-12 col-md-6 col-xl-3 mb-4 d-flex"
            key={index}
          >
            <motion.div
              className="card shadow-sm border-0 rounded-4 w-100 h-100"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
            >
              <div className="card-body text-center d-flex flex-column justify-content-between h-100">
                <div>
                  {card.icon}
                  <h5 className="card-title fw-semibold mt-2">{card.title}</h5>
                  <p className="text-muted small">{card.desc}</p>
                </div>
                <div className="d-grid gap-2 mt-3">
                  {card.buttons.map((btn, i) => (
                    <button
                      key={i}
                      className={`btn btn-${btn.variant}`}
                      onClick={btn.onClick}
                    >
                      {btn.text}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
