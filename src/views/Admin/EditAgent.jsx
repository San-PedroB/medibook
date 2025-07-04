import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AgentForm from "../../components/agent/AgentForm";
import { getAgentsByCompanyId, updateAgentById } from "../../services/userService";
import { triggerAnimation } from "../../utils/animationUtils";

export default function EditAgent() {
  const { agentId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const errorRef = useRef(null);

  const [agentData, setAgentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Cargar datos del agente
  useEffect(() => {
    if (!user?.companyId) return;

    const fetchAgent = async () => {
      try {
        // Trae todos los agentes y filtra por ID (puedes optimizar si tienes getAgentById)
        const allAgents = await getAgentsByCompanyId(user.companyId);
        const agent = allAgents.find(a => a.id === agentId);
        if (!agent) throw new Error("Agente no encontrado");
        setAgentData(agent);
      } catch (err) {
        setErrorMessage("No se pudo cargar la información del agente.");
        console.error("Error cargando agente:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgent();
  }, [agentId, user]);

  const handleSubmit = async (formValues) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);
    try {
      // Siempre pasa companyId por si acaso la Cloud Function lo requiere
      await updateAgentById(agentId, {
        ...formValues,
        companyId: user.companyId
      });
      setSuccessMessage("Agente actualizado correctamente.");
      setTimeout(() => navigate("/agents"), 1200);
    } catch (error) {
      setErrorMessage(error.message || "Error al actualizar agente.");
      triggerAnimation(errorRef, "animate__headShake");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p className="text-center my-5">Cargando agente...</p>;
  if (errorMessage && !agentData) return <p className="text-danger text-center my-5">{errorMessage}</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Editar Agente</h2>
        {successMessage && (
          <div className="alert alert-success text-center" role="alert">
            {successMessage}
          </div>
        )}
        {agentData && (
          <AgentForm
            initialValues={{
              firstName: agentData.firstName,
              lastName: agentData.lastName,
              secondLastName: agentData.secondLastName,
              rut: agentData.rut,
              email: agentData.email,
            }}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            errorMessage={errorMessage}
            submitText="Guardar Cambios"
            showPassword={false} // Oculta password al editar
          />
        )}
      </div>
    </div>
  );
}
