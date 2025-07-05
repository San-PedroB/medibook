// src/views/Agent/PatientListView.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getPatientsByCompany, deletePatient } from "../../services/patientService";
import DataTable from "../../components/table/DataTable";
import { Button, Form } from "react-bootstrap";
import ModalConfirm from "../../components/ModalConfirm"; // ✅ Importación correcta

export default function PatientListView() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [globalFilter, setGlobalFilter] = useState(""); // Búsqueda global

  // Estados para ModalConfirm
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    (async () => {
      try {
        const data = await getPatientsByCompany(user.companyId);
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

  // Nuevo: abrir modal de confirmación
  const handleAskDelete = (patient) => {
    setSelectedPatient(patient);
    setShowConfirm(true);
  };

  // Nuevo: ejecutar eliminación solo si confirman
  const handleConfirmDelete = async () => {
    if (!selectedPatient) return;
    setIsLoading(true);
    try {
      await deletePatient(selectedPatient.id);
      setPatients((prev) => prev.filter((p) => p.id !== selectedPatient.id));
    } catch (err) {
      alert("Error eliminando paciente");
    } finally {
      setIsLoading(false);
      setShowConfirm(false);
      setSelectedPatient(null);
    }
  };

  const columns = [
    { header: "Nombre", accessor: "firstName" },
    { header: "Apellido Paterno", accessor: "lastNameP" },
    { header: "Apellido Materno", accessor: "lastNameM" },
    { header: "RUT", accessor: "rut" },
    { header: "Teléfono", accessor: "phone" },
    { header: "Email", accessor: "email" },
    {
      header: "Fecha nacimiento",
      accessor: "birthDate",
      cell: ({ value }) => {
        if (!value) return "-";
        if (typeof value === "object" && value.seconds) {
          return new Date(value.seconds * 1000).toLocaleDateString();
        }
        return new Date(value).toLocaleDateString();
      },
    },
    { header: "Previsión", accessor: "previsionType" },
    { header: "Género", accessor: "gender" },
    {
      header: "Acciones",
      accessor: "actions",
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
              onClick={() => handleAskDelete(patient)}
              disabled={isLoading && selectedPatient?.id === patient.id}
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

  return (
    <div className="container mt-4">
      {/* Búsqueda y botón juntos a la derecha */}
      <div className="d-flex justify-content-end align-items-center mb-4 gap-2">
        <Form.Control
          placeholder="Buscar..."
          style={{ maxWidth: 250 }}
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="me-2"
        />
        <Button
          variant="success"
          onClick={() => navigate("/create-patient")}
          style={{ whiteSpace: "nowrap" }}
        >
          Añadir Paciente
        </Button>
      </div>
      <DataTable
        data={patients}
        columns={columns}
        globalFilter={globalFilter}
      />
      {/* ModalConfirm para eliminar paciente */}
      <ModalConfirm
        show={showConfirm}
        title="Eliminar paciente"
        message={
          selectedPatient
            ? `¿Estás seguro de eliminar al paciente "${selectedPatient.firstName} ${selectedPatient.lastNameP}"? Esta acción no se puede deshacer.`
            : "¿Estás seguro de eliminar este paciente? Esta acción no se puede deshacer."
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedPatient(null);
        }}
        confirmVariant="danger"
        isLoading={isLoading}
      />
    </div>
  );
}
