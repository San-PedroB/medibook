import EditAgentDetails from "../../components/agent/EditAgentDetails"
//import EditAgentPassword from "../components/agent/EditAgentPassword"
import { useParams } from "react-router-dom";


function EditAgent() {
  const { id } = useParams();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Agente</h2>
      <EditAgentDetails agentId={id} />
    </div>
  );
}

export default EditAgent;
