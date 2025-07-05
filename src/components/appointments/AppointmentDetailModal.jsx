import React, { useState } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import ModalConfirm from "../../components/ModalConfirm"; // Ajusta el import según la ubicación real

export default function AppointmentDetailModal({
  show,
  onHide,
  appointment,
  onChangeStatus,
  onDelete,
  statusOptions = ["Agendada", "En progreso", "Finalizada", "Cancelada"],
}) {
  // Estado para ModalConfirm
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!appointment) return null;

  const {
    patientName,
    doctorName,
    specialties,
    start,
    end,
    notes,
    status = "Agendada"
  } = appointment;

  // Formatear horarios
  const formatDateTime = (dateObj) => {
    if (!dateObj) return "";
    const date = new Date(dateObj);
    const pad = (num) => String(num).padStart(2, "0");
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const specialtyText = Array.isArray(specialties)
    ? specialties.join(" / ")
    : specialties || "Especialidad";

  // Handler para confirmar eliminación
  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(); // Ejecuta la función que borra la cita (debe estar definida en la vista padre)
    } finally {
      setIsLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalle de la Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <strong>Paciente:</strong> {patientName}
          </div>
          <div>
            <strong>Médico:</strong> {doctorName}
          </div>
          <div>
            <strong>Especialidad:</strong> {specialtyText}
          </div>
          <div>
            <strong>Horario:</strong> {formatDateTime(start)} a {formatDateTime(end)}
          </div>
          <div>
            <strong>Notas:</strong> {notes || <span className="text-muted">Sin notas</span>}
          </div>
          <div>
            <strong>Estado:</strong>{" "}
            <Badge bg={status === "Cancelada" ? "danger" : status === "Finalizada" ? "success" : status === "En progreso" ? "info" : "secondary"}>
              {status}
            </Badge>
          </div>
          <div className="mt-3">
            <strong>Cambiar estado:</strong>
            <div>
              {statusOptions.map(opt => (
                <Button
                  key={opt}
                  variant={opt === status ? "primary" : "outline-primary"}
                  size="sm"
                  className="me-2 mt-2"
                  onClick={() => onChangeStatus(opt)}
                  disabled={opt === status}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => setShowConfirm(true)}
            disabled={isLoading}
          >
            Eliminar cita
          </Button>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal de confirmación para eliminar cita */}
      <ModalConfirm
        show={showConfirm}
        title="Eliminar cita"
        message="¿Estás seguro de que deseas eliminar esta cita? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
        confirmVariant="danger"
        isLoading={isLoading}
      />
    </>
  );
}
