import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { triggerAnimation } from "../../utils/animationUtils";
import { createPatient } from "../../services/patientService";
import { useAuth } from "../../context/AuthContext";
import PatientForm from "../../components/patient/PatientForm"; // <--- Cambiado aquí
// ¡Ya NO necesitas useFormField ni validatePatientForm acá!

export default function CreatePatientView() {
  const { user } = useAuth();
  const errorRef = useRef(null);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (formValues) => {
    setErrorMessage("");
    try {
      setIsSubmitting(true);
      await createPatient({
        ...formValues,
        companyId: user.companyId,
        createdBy: user.uid
      });
      navigate("/patient-list-view");
    } catch (err) {
      console.error(err);
      setErrorMessage("Error al registrar paciente");
      triggerAnimation(errorRef, "animate__headShake");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return <p>Cargando usuario...</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "800px" }}>
        <h2 className="text-center mb-4">Registrar paciente</h2>
        <PatientForm
          onSubmit={handleRegister}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          submitText="Registrar paciente"
          showObligatoryNote={true}
        />
      </div>
    </div>
  );
}
