import { useEffect, useState } from "react";
import DataTable from "../../components/table/DataTable";
import { getDoctorsByCompanyId, deleteDoctor } from "../../services/doctorService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const columns = [
  { header: "Nombre", accessor: "firstName" },
  { header: "Apellido Paterno", accessor: "paternalLastName" },
  { header: "Apellido Materno", accessor: "maternalLastName" },
  { header: "Correo", accessor: "email" },
  { header: "RUT", accessor: "rut" },
  {
    header: "Fecha de Registro",
    accessor: "createdAt",
    cell: ({ value }) => {
      if (value?.toDate) {
        // Caso normal: Timestamp de Firestore
        return value.toDate().toLocaleDateString("es-CL");
      } else if (value?.seconds) {
        // Caso objeto plano {seconds, nanoseconds}
        return new Date(value.seconds * 1000).toLocaleDateString("es-CL");
      } else {
        return "-";
      }
    },
  },
];

export default function DoctorList() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });

  // 1️⃣ Carga inicial
  useEffect(() => {
    if (!user?.companyId) return;
    (async () => {
      try {
        const data = await getDoctorsByCompanyId(user.companyId);
        setDoctors(data);
      } catch {
        setMsg({ type: "danger", text: "Error al cargar médicos" });
      }
    })();
  }, [user]);

  // 2️⃣ Handlers
  const handleEdit = (doctor) => {
    navigate(`/edit-doctor/${doctor.id}`);
  };

  const handleDelete = async (doctor) => {
    if (!window.confirm("¿Estás seguro de eliminar este doctor?")) return;
    try {
      await deleteDoctor(doctor.id);
      setMsg({ type: "success", text: "Doctor eliminado" });
      setDoctors((prev) => prev.filter((d) => d.id !== doctor.id));
    } catch {
      setMsg({ type: "danger", text: "Error al eliminar doctor" });
    }
  };

  return (
    <div className="container mt-4">
      {/* Barra superior: búsqueda + botón alineados a la derecha */}
      <div className="d-flex justify-content-end align-items-center mb-4 gap-2">
        <Form.Control
          placeholder="Buscar..."
          style={{ maxWidth: 250 }}
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="me-2"
        />
        <Button
          variant="success"
          onClick={() => navigate("/create-doctor")}
          style={{ whiteSpace: "nowrap" }}
        >
          Añadir Médico
        </Button>
      </div>

      {msg.text && (
        <div className={`alert alert-${msg.type}`} role="alert">
          {msg.text}
        </div>
      )}

      <DataTable
        data={doctors}
        columns={columns}
        globalFilter={filter}
        onGlobalFilterChange={setFilter}
        onStartEdit={handleEdit}
        onDelete={handleDelete}
        rowKey="id"
      />
    </div>
  );
}
