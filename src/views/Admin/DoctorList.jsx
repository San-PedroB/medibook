// === src/views/Doctors/DoctorList.jsx ===
import { useEffect, useState } from "react";
import { getDoctorsByCompanyId, deleteDoctor } from "../../services/doctorService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/table/DataTable";

function DoctorList() {
  const [filter, setFilter] = useState("");
  const [doctors, setDoctors] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleEdit = (doctorId) => {
    navigate(`/edit-doctor/${doctorId}`);
  };

  const handleDelete = async (doctorId) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este doctor?");
    if (!confirm) return;

    try {
      await deleteDoctor(doctorId);
      setDoctors((prev) => prev.filter((doc) => doc.id !== doctorId));
    } catch (error) {
      console.error("❌ Error al eliminar doctor:", error);
      alert("Error al eliminar doctor.");
    }
  };

  useEffect(() => {
    if (!user?.companyId) return;

    const fetchDoctors = async () => {
      try {
        const data = await getDoctorsByCompanyId(user.companyId);
        setDoctors(data);
      } catch (error) {
        console.error("Error al cargar doctores:", error);
      }
    };

    fetchDoctors();
  }, [user]);

  const columns = [
    { header: "Nombre", accessorKey: "firstName" },
    { header: "Apellido Paterno", accessorKey: "paternalLastName" },
    { header: "Apellido Materno", accessorKey: "maternalLastName" },
    { header: "Correo", accessorKey: "email" },
    { header: "RUT", accessorKey: "rut" },
    {
      header: "Fecha de Registro",
      accessorKey: "createdAt",
      cell: (info) => {
        const ts = info.getValue();
        return ts?.toDate ? ts.toDate().toLocaleDateString("es-CL") : "-";
      }
    },
    {
      header: "Especialidades",
      accessorKey: "specialties",
      cell: ({ row }) => row.original.specialties?.join(" / "),
      filterFn: "includesString", // asegura compatibilidad
      accessorFn: (row) => row.specialties?.join(" ") || "" // <- esto es la clave
    },
    {
      header: "Acciones",
      cell: ({ row }) => (
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-primary" onClick={() => handleEdit(row.original.id)}>
            Editar
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(row.original.id)}>
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  const filteredDoctors = doctors.filter((doctor) =>
  filter === "" || doctor.specialties?.includes(filter)
  );


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Lista de Médicos</h2>
        {/* 🔍 El input está incluido dentro del DataTable.jsx */}
      </div>

      <DataTable data={doctors} columns={columns} />
    </div>
  );
}

export default DoctorList;
