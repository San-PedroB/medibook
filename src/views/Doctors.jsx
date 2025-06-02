// src/views/Doctors.jsx
import { useEffect, useState } from "react";
import { getDoctors, deleteDoctorById } from "../services/firebaseService";
import { useNavigate } from "react-router-dom";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorList = await getDoctors();
        setDoctors(doctorList);
      } catch (err) {
        console.error("❌ Error al obtener doctores:", err);
        setError("No se pudieron cargar los doctores.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (doctorId) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este médico?");
    if (!confirm) return;

    try {
      await deleteDoctorById(doctorId);
      setDoctors((prev) => prev.filter((doc) => doc.id !== doctorId));
    } catch (err) {
      alert("No se pudo eliminar el médico.");
    }
  };

  if (loading) return <div className="container mt-5">Cargando doctores...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Médicos</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Especialidad</th>
            <th>Teléfono</th>
            <th>Acciones</th>
            <th>Fecha de Creación</th>
            <th>Historial de Citas</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.name}</td>
              <td>{doc.email}</td>
              <td>{doc.specialty}</td>
              <td>{doc.phone}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => navigate(`/edit-doctor/${doc.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(doc.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorList;
