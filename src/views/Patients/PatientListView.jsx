import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getPatientsByCompany, deletePatient } from "../../services/patientService";
import DataTable from "../../components/table/DataTable";

export default function PatientListView() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    (async () => {
      try {
        const data = await getPatientsByCompany(user.companyId);
        console.log("Pacientes traídos:", data); // <-- AQUÍ el log
        console.log("Usuario logueado:", user);
        console.log("Buscando pacientes para companyId:", user.companyId);

        setPatients(data);
      } catch (err) {
        setError("Error al cargar pacientes.");
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);


  const handleEdit = (patient) => {
    navigate(`/edit-patient-view/${patient.id}`);
  };


  const handleDelete = async (patient) => {
    const confirm = window.confirm(`¿Eliminar paciente ${patient.firstName} ${patient.lastNameP}?`);
    if (!confirm) return;

    try {
      await deletePatient(patient.id);
      setPatients((prev) => prev.filter((p) => p.id !== patient.id));
    } catch (err) {
      alert("Error eliminando paciente");
    }
  };

  const columns = [
    { header: "Nombre", accessorKey: "firstName" },
    { header: "Apellido Paterno", accessorKey: "lastNameP" },
    { header: "Apellido Materno", accessorKey: "lastNameM" },
    { header: "RUT", accessorKey: "rut" },
    { header: "Teléfono", accessorKey: "phone" },
    { header: "Email", accessorKey: "email" },
    {
      header: "Fecha nacimiento",
      accessorFn: (row) => {
        if (!row.birthDate) return "";
        if (typeof row.birthDate === "object" && row.birthDate.seconds) {
          return new Date(row.birthDate.seconds * 1000).toLocaleDateString();
        }
        return new Date(row.birthDate).toLocaleDateString();
      },
    },
    { header: "Previsión", accessorKey: "previsionType" },
    { header: "Género", accessorKey: "gender" },
    {
      header: "Acciones",
      id: "actions",
      cell: ({ row }) => {
        const patient = row.original;
        return (
          <>
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={() => handleEdit(patient)}
            >
              Editar
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(patient)}
            >
              Eliminar
            </button>
          </>
        );
      },
    },
  ];

  if (loading) return <div className="text-center my-5">Cargando pacientes...</div>;
  if (error) return <div className="text-danger text-center my-5">{error}</div>;
  if (!patients.length) return <div className="text-center my-5">No hay pacientes registrados.</div>;

  return (
    <div className="container mt-4">
      <h2>Lista de pacientes</h2>
      <DataTable data={patients} columns={columns} />
    </div>
  );
}
