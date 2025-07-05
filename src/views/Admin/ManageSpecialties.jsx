import React, { useEffect, useState } from "react";
import { Button, Form, Table, Alert, InputGroup } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import {
  addSpecialty,
  getSpecialtiesByCompany,
  deleteSpecialty,
  updateSpecialty,
} from "../../services/specialtyService";
import DashboardHeader from "../../components/layout/DashboardHeader";
import ModalConfirm from "../../components/ModalConfirm"; // ✅ Import

const ManageSpecialties = () => {
  const { user } = useAuth();
  const [specialties, setSpecialties] = useState([]);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // Estados para ModalConfirm
  const [showConfirm, setShowConfirm] = useState(false);
  const [specialtyToDelete, setSpecialtyToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadSpecialties = async () => {
    try {
      const data = await getSpecialtiesByCompany(user.companyId);
      setSpecialties(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar especialidades");
    }
  };

  useEffect(() => {
    if (user?.companyId) loadSpecialties();
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await addSpecialty({ name: newSpecialty, companyId: user.companyId });
      setNewSpecialty("");
      setSuccess("Especialidad agregada correctamente");
      loadSpecialties();
    } catch (err) {
      setError(err.message);
    }
  };

  // Nuevo: Solicita confirmación antes de eliminar
  const handleAskDelete = (spec) => {
    setSpecialtyToDelete(spec);
    setShowConfirm(true);
  };

  // Nuevo: Elimina si confirman en el modal
  const handleConfirmDelete = async () => {
    if (!specialtyToDelete) return;
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      await deleteSpecialty(specialtyToDelete.id);
      setSuccess("Especialidad eliminada");
      loadSpecialties();
    } catch (err) {
      console.error(err);
      setError("Error al eliminar especialidad");
    } finally {
      setIsLoading(false);
      setShowConfirm(false);
      setSpecialtyToDelete(null);
    }
  };

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditName(name);
    setError("");
    setSuccess("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
    setError("");
    setSuccess("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await updateSpecialty(editingId, editName);
      setSuccess("Especialidad actualizada correctamente");
      cancelEditing();
      loadSpecialties();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <div className="container mt-4">
        <h2 className="mb-4">Gestión de Especialidades</h2>
        <p>Cargando usuario...</p>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader
        title="Gestión de Especialidades"
        subtitle="Agrega, edita o elimina especialidades de tu clínica"
      />

      <div className="container mt-4">
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {/* Tabla de especialidades */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Especialidad</th>
              <th style={{ width: '200px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {specialties.map((spec) => (
              <tr key={spec.id}>
                <td>
                  {editingId === spec.id ? (
                    <Form.Control
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    spec.name
                  )}
                </td>
                <td>
                  {editingId === spec.id ? (
                    <InputGroup>
                      <Button size="sm" onClick={handleUpdate}>Guardar</Button>
                      <Button size="sm" variant="secondary" onClick={cancelEditing}>Cancelar</Button>
                    </InputGroup>
                  ) : (
                    <>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => startEditing(spec.id, spec.name)}
                        className="me-2"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleAskDelete(spec)}
                        disabled={isLoading && specialtyToDelete?.id === spec.id}
                      >
                        Eliminar
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Formulario para agregar nueva especialidad */}
        <Form onSubmit={handleAdd} className="mt-4">
          <Form.Group controlId="specialtyName">
            <Form.Label>Nombre de la especialidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Pediatría"
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Agregar especialidad
          </Button>
        </Form>
      </div>

      {/* ModalConfirm para eliminar especialidad */}
      <ModalConfirm
        show={showConfirm}
        title="Eliminar especialidad"
        message={
          specialtyToDelete
            ? `¿Estás seguro de eliminar la especialidad "${specialtyToDelete.name}"? Esta acción no se puede deshacer.`
            : "¿Estás seguro de eliminar esta especialidad? Esta acción no se puede deshacer."
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setSpecialtyToDelete(null);
        }}
        confirmVariant="danger"
        isLoading={isLoading}
      />
    </>
  );
};

export default ManageSpecialties;
