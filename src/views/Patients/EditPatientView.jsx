import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import EditPatientForm from "../../components/patient/EditPatientForm";
import { getPatientById, updatePatient } from "../../services/patientService";

export default function EditPatientView() {
  const { patientId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const errorRef = useRef(null);

  const [patientData, setPatientData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getPatientById(patientId);
        setPatientData(data);
      } catch {
        setErrorMessage("Paciente no encontrado.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [patientId]);

  const handleSubmit = async (formData) => {
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await updatePatient(patientId, formData);
      navigate("/patient-list-view");
    } catch (error) {
      setErrorMessage(error.message || "Error al actualizar paciente.");
      // Puedes usar triggerAnimation con errorRef si lo tienes
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>Cargando paciente...</p>;
  if (errorMessage && !patientData) return <p className="text-danger">{errorMessage}</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "800px" }}>
        <h2 className="text-center mb-4">Editar Paciente</h2>
        {patientData && (
          <EditPatientForm
            formData={patientData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            errorMessage={errorMessage}
            errorRef={errorRef}
          />
        )}
      </div>
    </div>
  );
}
