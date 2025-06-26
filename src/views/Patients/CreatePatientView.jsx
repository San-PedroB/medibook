import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormField from "../../hooks/useFormField";
import { triggerAnimation } from "../../utils/animationUtils";
import { createPatient } from "../../services/patientService";
import { useAuth } from "../../context/AuthContext";
import CreatePatientForm from "../../components/patient/CreatePatientForm";
import { validatePatientForm } from "../../utils/validationSchemas";

export default function CreatePatientView() {
  const { user } = useAuth();
  const errorRef = useRef(null);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Hooks para cada campo
  const firstName     = useFormField();
  const lastNameP     = useFormField();
  const lastNameM     = useFormField();
  const rut           = useFormField();
  const phone         = useFormField();
  const email         = useFormField();
  const birthDate     = useFormField();
  const previsionType = useFormField();
  const nationality   = useFormField();
  const address       = useFormField();
  const gender        = useFormField();

  // Objeto formFields para pasar a CreatePatientForm
  const formFields = {
    firstName,
    lastNameP,
    lastNameM,
    rut,
    phone,
    email,
    birthDate,
    previsionType,
    nationality,
    address,
    gender
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setFieldErrors({});

    // Recolecta los valores del formulario
    const values = {
      firstName:     firstName.value,
      lastNameP:     lastNameP.value,
      lastNameM:     lastNameM.value,
      rut:           rut.value,
      phone:         phone.value,
      email:         email.value,
      birthDate:     birthDate.value,
      previsionType: previsionType.value,
      nationality:   nationality.value,
      address:       address.value,
      gender:        gender.value,
    };

    // Llama la validación avanzada
    const errors = validatePatientForm(values);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setErrorMessage("Revisa los campos con error");
      triggerAnimation(errorRef, "animate__headShake");
      return;
    }

    try {
      setIsSubmitting(true);
      await createPatient({
        ...values,
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
        <CreatePatientForm
          formFields={formFields}
          onSubmit={handleRegister}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          errorRef={errorRef}
          fieldErrors={fieldErrors} // <-- pasa los errores por campo
        />
      </div>
    </div>
  );
}
