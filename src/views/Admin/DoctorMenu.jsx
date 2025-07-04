// src/views/Admin/DoctorMenu.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaUserMd, FaListUl } from "react-icons/fa";

import DashboardHeader from "../../components/layout/DashboardHeader";
import MenuCard from "../../components/cards/MenuCard";

export default function DoctorMenu() {
  const navigate = useNavigate();

  const items = [
    {
      title: "Registrar Médico",
      description: "Añade un nuevo profesional al sistema.",
      buttonText: "Crear Médico",
      onClick: () => navigate("/create-doctor"),
      icon: <FaUserMd size={32} className="text-primary mb-2" />
    },
    {
      title: "Ver Lista de Médicos",
      description: "Consulta y edita médicos registrados.",
      buttonText: "Ver Médicos",
      onClick: () => navigate("/doctor-list"),
      icon: <FaListUl size={32} className="text-primary mb-2" />
    }
  ];

  return (
    <Container fluid className="px-4">
      {/* Header dinámico: le pasamos title/subtitle en vez de greeting/name */}
      <DashboardHeader
        title="Gestión de Médicos"
        subtitle="Selecciona una opción para continuar"
      />

      <Row
        className="justify-content-center gx-4"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {items.map((item, index) => (
          <Col
            key={index}
            xs={12}
            sm={10}
            md={6}
            lg={5}
            className="d-flex justify-content-center"
          >
            <MenuCard
              title={item.title}
              description={item.description}
              buttonText={item.buttonText}
              onClick={item.onClick}
              icon={item.icon}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
