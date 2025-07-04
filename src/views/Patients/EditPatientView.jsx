import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PatientForm from "../../components/patient/PatientForm"; // <--- usa el formulario unificado
import { getPatientById, updatePatient } from "../../services/patientService";
import { triggerAnimation } from "../../utils/animationUtils";

export default function EditPatientView() {
  const { patientId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const errorRef = useRef(null);

  const [patientData, setPatientData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    setSuccessMessage("");
    setIsSubmitting(true);
    try {
      await updatePatient(patientId, formData);
      setSuccessMessage("Paciente actualizado correctamente.");
      setTimeout(() => navigate("/patient-list-view"), 1200);
    } catch (error) {
      setErrorMessage(error.message || "Error al actualizar paciente.");
      triggerAnimation(errorRef, "animate__headShake");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p className="text-center my-5">Cargando paciente...</p>;
  if (errorMessage && !patientData) return <p className="text-danger text-center my-5">{errorMessage}</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "800px" }}>
        <h2 className="text-center mb-4">Editar Paciente</h2>
        {successMessage && (
          <div className="alert alert-success text-center" role="alert">
            {successMessage}
          </div>
        )}
        {patientData && (
          <PatientForm
            initialValues={patientData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            errorMessage={errorMessage}
            submitText="Guardar Cambios"
            showObligatoryNote={false}
          />
        )}
      </div>
    </div>
  );
}
