import { useEffect, useState } from "react";
import DataTable from "../../components/table/DataTable";
import {
  getAgentsByCompanyId,
  deleteAgentById,
} from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const columns = [
  { header: "Nombre", accessor: "firstName" },
  { header: "Apellido Paterno", accessor: "lastName" },
  { header: "Apellido Materno", accessor: "secondLastName" },
  { header: "Email", accessor: "email" },
  { header: "RUT", accessor: "rut" },
];

export default function Agents() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [filter, setFilter] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Carga inicial
  useEffect(() => {
    if (!user?.companyId) return;
    (async () => {
      try {
        const data = await getAgentsByCompanyId(user.companyId);
        setAgents(data);
      } catch {
        setMsg({ type: "danger", text: "Error al cargar agentes" });
      }
    })();
  }, [user]);

  const handleEdit = (agent) => {
    navigate(`/edit-agent/${agent.id}`);
  };

  const doDelete = async (agent) => {
    if (!window.confirm("¿Eliminar este agente?")) return;
    try {
      await deleteAgentById(agent.id);
      setMsg({ type: "success", text: "Agente eliminado" });
      setAgents((prev) => prev.filter((a) => a.id !== agent.id));
    } catch {
      setMsg({ type: "danger", text: "Error al eliminar agente" });
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
          onClick={() => navigate("/create-agent")}
          style={{ whiteSpace: "nowrap" }}
        >
          Añadir Agente
        </Button>
      </div>

      {msg.text && (
        <div className={`alert alert-${msg.type}`} role="alert">
          {msg.text}
        </div>
      )}

      <DataTable
        data={agents}
        columns={columns}
        globalFilter={filter}
        onGlobalFilterChange={setFilter}
        onStartEdit={handleEdit}
        onDelete={doDelete}
        rowKey="id"
      />
    </div>
  );
}
