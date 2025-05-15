import { useEffect, useState } from "react";
import { getDoctorsByCompanyId, deleteDoctor } from "../../services/doctorService";
import { getCurrentUserData } from "../../services/userService";
import { useNavigate } from "react-router-dom";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const userData = await getCurrentUserData();
        const doctorList = await getDoctorsByCompanyId(userData.companyId);
        setDoctors(doctorList);
      } catch (error) {
        console.error("❌ Error al cargar médicos:", error);
      }
    }

    fetchDoctors();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-doctor/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este médico?")) {
      await deleteDoctor(id);
      setDoctors(doctors.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Médicos</h2>
      {doctors.length === 0 ? (
        <p>No hay médicos registrados.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Especialidades</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.specialties.join(", ")}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(doctor.id)}>
                    Editar
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(doctor.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Doctors;
