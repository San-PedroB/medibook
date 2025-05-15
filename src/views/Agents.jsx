import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getAgentsByCompanyId, deleteAgentById } from "../services/userService";
import { useNavigate } from "react-router-dom";


function AgentList() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchAgents = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) return;

        try {
          const adminDocRef = doc(db, "users", user.uid);
          const adminSnapshot = await getDoc(adminDocRef);

          if (!adminSnapshot.exists()) {
            setError("No se encontró al administrador.");
            return;
          }

          const adminData = adminSnapshot.data();
          setCompanyName(adminData.companyName);

          const companyId = adminData.companyId;
          const agentList = await getAgentsByCompanyId(companyId);

          setAgents(agentList);
        } catch (err) {
          console.error("❌ Error al obtener agentes:", err);
          setError("No se pudieron cargar los agentes.");
        } finally {
          setLoading(false);
        }
      });
    };

    fetchAgents();
  }, []);

  const handleDelete = async (agentId) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este agente?");
    if (!confirmDelete) return;

    try {
      await deleteAgentById(agentId);
      setAgents((prev) => prev.filter((agent) => agent.id !== agentId));
    } catch (err) {
      alert("No se pudo eliminar el agente.");
    }
  };

  if (loading) return <div className="container mt-5">Cargando agentes...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
  <div className="container mt-5">
    <h2 className="mb-4">
      Agentes registrados en <span className="text-primary">{companyName}</span>
    </h2>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Fecha de Registro</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {agents.map((agent) => (
          <tr key={agent.id}>
            <td>{agent.name}</td>
            <td>{agent.email}</td>
            <td>{agent.createdAt?.toDate().toLocaleString() || "—"}</td>
            <td>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => navigate(`/edit-agent/${agent.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(agent.id)}
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default AgentList;
