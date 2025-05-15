import { useEffect, useState, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";
import { triggerAnimation } from "../../utils/animationUtils";
import { updateAgentById } from "../../services/userService";
import { useNavigate } from "react-router-dom";

// Microcomponentes
import NameInput from "../formElements/NameInput";
import EmailInput from "../formElements/EmailInput";
import SubmitButton from "../formElements/SubmitButton";
import ErrorMessage from "../formElements/ErrorMessage";

// Componente extra
import EditAgentPassword from "./EditAgentPassword";

function EditAgentDetails({ agentId }) {
  const name = useFormField();
  const email = useFormField();
  const errorRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const passwordFormRef = useRef(null); // 🆕 Referencia para scroll
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const agentRef = doc(db, "users", agentId);
        const agentSnap = await getDoc(agentRef);
        if (!agentSnap.exists()) throw new Error();

        const data = agentSnap.data();
        name.setValue(data.name || "");
        email.setValue(data.email || "");
      } catch {
        setErrorMessage("Error al cargar los datos del agente.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentId]);

  // 🆕 Desplaza hacia el formulario de contraseña cuando se despliega
  useEffect(() => {
    if (showPasswordForm && passwordFormRef.current) {
      passwordFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showPasswordForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = [name.value, email.value];

    if (!validateFields(fields)) {
      setErrorMessage("Complete todos los campos.");
      triggerAnimation(errorRef, "animate__headShake");
      return;
    }

    setIsSubmitting(true);

    try {
      await updateAgentById(agentId, {
        name: name.value,
        email: email.value,
      });
      navigate("/agents");
    } catch (err) {
      console.error("❌ Error al actualizar agente:", err);
      setErrorMessage("No se pudo actualizar el agente.");
      triggerAnimation(errorRef, "animate__headShake");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="container mt-3">Cargando datos del agente...</div>;

  return (
    <>
      <form onSubmit={handleSubmit} className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <NameInput {...name} label="Nombre completo" />
        <EmailInput {...email} label="Correo electrónico" />
        
        <button
          type="button"
          className="btn btn-outline-secondary w-100 mt-3"
          onClick={() => setShowPasswordForm(!showPasswordForm)}
        >
          {showPasswordForm ? "Ocultar" : "Actualizar contraseña"}
        </button>

        {errorMessage && <ErrorMessage message={errorMessage} forwardedRef={errorRef} />}
        <SubmitButton text="Guardar Cambios" isSubmitting={isSubmitting} />
      </form>

      {showPasswordForm && (
        <div ref={passwordFormRef}>
          <EditAgentPassword agentId={agentId} />
        </div>
      )}
    </>
  );
}

export default EditAgentDetails;
