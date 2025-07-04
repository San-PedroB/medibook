import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaUserPlus, FaListUl } from "react-icons/fa";

import DashboardHeader from "../../components/layout/DashboardHeader";
import MenuCard from "../../components/cards/MenuCard";

export default function PatientMenu() {
  const navigate = useNavigate();

  const items = [
    {
      title: "Añadir Paciente",
      description: "Registra un nuevo paciente en el sistema.",
      buttonText: "Nuevo Paciente",
      onClick: () => navigate("/create-patient"),
      icon: <FaUserPlus size={32} className="text-success mb-2" />
    },
    {
      title: "Ver Lista de Pacientes",
      description: "Consulta, edita o elimina pacientes existentes.",
      buttonText: "Ver Pacientes",
      onClick: () => navigate("/patient-list-view"),
      icon: <FaListUl size={32} className="text-success mb-2" />
    }
  ];

  return (
    <Container fluid className="px-4">
      <DashboardHeader
        title="Gestión de Pacientes"
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
