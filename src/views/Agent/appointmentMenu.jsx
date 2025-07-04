import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaPlusCircle } from "react-icons/fa";

import DashboardHeader from "../../components/layout/DashboardHeader";
import MenuCard from "../../components/cards/MenuCard";

export default function AppointmentMenu() {
  const navigate = useNavigate();

  const items = [
    {
      title: "Ver Calendario",
      description: "Visualiza todas las citas agendadas en formato calendario.",
      buttonText: "Ver Calendario",
      onClick: () => navigate("/appointments-calendar"),
      icon: <FaCalendarAlt size={32} className="text-primary mb-2" />
    },
    {
      title: "Nueva Cita",
      description: "Agendar una nueva cita médica.",
      buttonText: "Crear Cita",
      onClick: () => navigate("/add-appointment"),
      icon: <FaPlusCircle size={32} className="text-success mb-2" />
    }
  ];

  return (
    <Container fluid className="px-4">
      <DashboardHeader
        title="Gestión de Citas"
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
