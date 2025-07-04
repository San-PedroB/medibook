// src/views/Admin/AgentMenu.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaUserTie, FaListUl } from "react-icons/fa";

import DashboardHeader from "../../components/layout/DashboardHeader";
import MenuCard from "../../components/cards/MenuCard";

export default function AgentMenu() {
  const navigate = useNavigate();

  const items = [
    {
      title: "Registrar Agente",
      description: "Crea una cuenta para un nuevo agente operativo.",
      buttonText: "Crear Agente",
      onClick: () => navigate("/create-agent"),
      icon: <FaUserTie size={32} className="text-primary mb-2" />
    },
    {
      title: "Ver Lista de Agentes",
      description: "Revisa, edita o elimina agentes existentes.",
      buttonText: "Ver Agentes",
      onClick: () => navigate("/agent-list"),
      icon: <FaListUl size={32} className="text-primary mb-2" />
    }
  ];

  return (
    <Container fluid className="px-4">
      {/* Header dinámico: reutilizamos DashboardHeader */}
      <DashboardHeader
        title="Gestión de Agentes"
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
