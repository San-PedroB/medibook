import { useEffect, useState } from "react";
import DataTable from "../../components/table/DataTable";
import { getAgentsByCompanyId, deleteAgentById } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";



function Agents() {
  const [agents, setAgents] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🔁 Editar agente
  const handleEdit = (agentId) => {
    navigate(`/edit-agent/${agentId}`);
  };

  // 🗑️ Eliminar agente
  const handleDelete = async (agentId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este agente?");
    if (!confirmDelete) return;

    try {
      await deleteAgentById(agentId);
      setAgents(prev => prev.filter(agent => agent.id !== agentId));
    } catch (error) {
      console.error("❌ Error al eliminar agente:", error);
      alert("Ocurrió un error al eliminar el agente.");
    }
  };

  // 🔄 Obtener agentes por empresa
  useEffect(() => {
    console.log("🔁 useEffect ejecutado");

    if (!user?.companyId) return;

    const fetchAgents = async () => {
      try {
        console.log("👉 CompanyId usado:", user?.companyId);
        const result = await getAgentsByCompanyId(user.companyId);
        console.log("🧪 Resultado de agentes:", result);
        setAgents(result);
      } catch (error) {
        console.error("Error al cargar agentes:", error);
      }
    };

    fetchAgents();
  }, [user]);


  // 🧱 Columnas para react-table
  const columns = [
    { header: "Nombre", accessorKey: "name" },
    { header: "Apellido Paterno", accessorKey: "lastName" },
    { header: "Apellido Materno", accessorKey: "secondLastName" },
    { header: "Correo", accessorKey: "email" },
    {
      header: "Fecha de Registro",
      accessorKey: "createdAt",
      cell: info => {
        const timestamp = info.getValue();
        if (!timestamp?.toDate) return "-";
        return timestamp.toDate().toLocaleDateString("es-CL");
      }
    },
    {
      header: "Acciones",
      cell: ({ row }) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(row.original.id)}
          >
            Editar
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleDelete(row.original.id)}
          >
            Eliminar
          </button>
        </div>
      )
    }
  ];

  console.log("🧩 user:", user);

  if (!user || !user.companyId) {
  return <div className="container mt-4">Cargando agentes...</div>;
  }


  return (
    <div className="container mt-4">
      <h2 className="mb-3">Lista de Agentes</h2>
      <DataTable data={agents} columns={columns}/>
    </div>
  );
}

export default Agents;
