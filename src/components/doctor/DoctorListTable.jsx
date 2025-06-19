// src/components/doctor/DoctorListTable.jsx
import React from "react";

export default function DoctorListTable({ doctors, onEdit, onDelete }) {
  if (doctors.length === 0) {
    return <p>No hay médicos registrados.</p>;
  }

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido Paterno</th>
          <th>Apellido Materno</th>
          <th>Email</th>
          <th>Especialidades</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doc) => (
          <tr key={doc.id}>
            <td>{doc.firstName}</td>
            <td>{doc.paternalLastName}</td>
            <td>{doc.maternalLastName}</td>
            <td>{doc.email}</td>
            <td>{doc.specialties.join(", ")}</td>
            <td>
              <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(doc.id)}>
                Editar
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(doc.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
