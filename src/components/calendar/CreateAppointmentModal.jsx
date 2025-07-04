// src/components/calendar/CreateAppointmentModal.jsx
import React from "react";
import { Modal } from "react-bootstrap";
import CreateAppointmentForm from "../appointments/CreateAppointmentForm";

export default function CreateAppointmentModal({ show, onHide, initialDate, onCreate, events }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Nueva Cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateAppointmentForm
          initialDate={initialDate}
          onSubmit={onCreate}
          onCancel={onHide}
          events={events} 
        />
      </Modal.Body>
    </Modal>
  );
}

