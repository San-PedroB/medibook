import React, { useEffect, useState } from "react";
import { Button, Form, Table, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import {
  addSpecialty,
  getSpecialtiesByCompany,
  deleteSpecialty,
} from "../../services/specialtyService";

const ManageSpecialties = () => {
  const { user } = useAuth();
  const [specialties, setSpecialties] = useState([]);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
  if (user?.companyId) {
    const fetchSpecialties = async () => {
      try {
        const data = await getSpecialtiesByCompany(user.companyId);
        setSpecialties(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar especialidades");
      }
    };

    fetchSpecialties();
  }
}, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    if (!user?.companyId) {
      setError("No se puede agregar especialidad. Usuario no válido.");
      return;
    }
  
    try {
      await addSpecialty({ name: newSpecialty, companyId: user.companyId });
      setNewSpecialty("");
      setSuccess("Especialidad agregada correctamente");
      loadSpecialties();
    } catch (err) {
      setError(err.message);
    }
  };


  const handleDelete = async (id) => {
    try {
      await deleteSpecialty(id);
      loadSpecialties();
    } catch (err) {
      console.error(err);
      setError("Error al eliminar especialidad");
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
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Especialidades</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit} className="mb-4">
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

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {specialties.map((spec) => (
            <tr key={spec.id}>
              <td>{spec.name}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(spec.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageSpecialties;
