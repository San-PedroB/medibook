// /components/doctor/CreateDoctorForm.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createDoctor } from "../../services/doctorService";
import { getCurrentUserData } from "../../services/userService";

import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";
import { triggerAnimation } from "../../utils/animationUtils";

// Microcomponentes
import NameInput from "../formElements/NameInput";
import EmailInput from "../formElements/EmailInput";
import AuthForm from "../AuthForm";


function CreateDoctorForm() {
  const fullName = useFormField();
  const email = useFormField();
  const specialties = useFormField();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const fields = [fullName.value, email.value, specialties.value];

    if (!validateFields(fields)) {
      setErrorMessage("Complete todos los campos");
      triggerAnimation(errorRef, "animate__headShake");
      return;
    }

    try {
      setIsSubmitting(true);
      const adminData = await getCurrentUserData();

      await createDoctor({
        name: fullName.value,
        email: email.value,
        specialties: specialties.value.split(",").map(s => s.trim()),
        companyId: adminData.companyId,
      });

      navigate("/doctor-list");
    } catch (error) {
      console.error("❌ Error al registrar médico:", error);
      setErrorMessage("Error al registrar médico");
      triggerAnimation(errorRef, "animate__headShake");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthForm
      onSubmit={handleRegister}
      fields={[
        <NameInput key="name" {...fullName} label="Nombre completo" />,
        <EmailInput key="email" {...email} label="Correo electrónico" />,
        <div className="mb-3" key="specialties">
          <label className="form-label">Especialidades</label>
          <input
            type="text"
            className="form-control"
            value={specialties.value}
            onChange={specialties.onChange}
            placeholder="Ej: Pediatría, Dermatología"
          />
        </div>,
      ]}
      errorMessage={errorMessage}
      isSubmitting={isSubmitting}
      errorRef={errorRef}
      submitText="Registrar Médico"
    />
  );
}

export default CreateDoctorForm;
