// src/views/CreateDoctor.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerDoctor } from "../services/firebaseService";

// Microcomponentes
import NameInput from "../components/formElements/NameInput";
import EmailInput from "../components/formElements/EmailInput";
import AuthForm from "../components/AuthForm";

// Nuevos inputs que puedes crear fácilmente:
import SpecialtyInput from "../components/formElements/SpecialtyInput";
import PhoneInput from "../components/formElements/PhoneInput";

// Utils
import useFormField from "../hooks/useFormField";
import { validateFields } from "../utils/formUtils";
import { triggerAnimation } from "../utils/animationUtils";

function CreateDoctor() {
  const fullName = useFormField();
  const email = useFormField();
  const specialty = useFormField();
  const phone = useFormField();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const fields = [fullName.value, email.value, specialty.value, phone.value];

    if (!validateFields(fields)) {
      setErrorMessage("Complete todos los campos");
      triggerAnimation(errorRef, "animate__headShake");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerDoctor({
        fullName: fullName.value,
        email: email.value,
        specialty: specialty.value,
        phone: phone.value,
      });

      navigate("/doctors");
    } catch (error) {
      console.error("❌ Error al registrar doctor:", error);
      setErrorMessage("Error al registrar doctor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Registrar Médico</h2>
        <AuthForm
          onSubmit={handleRegister}
          fields={[
            <NameInput key="name" {...fullName} label="Nombre completo" />,
            <EmailInput key="email" {...email} label="Correo electrónico" />,
            <SpecialtyInput key="specialty" {...specialty} label="Especialidad" />,
            <PhoneInput key="phone" {...phone} label="Número de teléfono" />,
          ]}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          errorRef={errorRef}
          submitText="Registrar Médico"
        />
      </div>
    </div>
  );
}

export default CreateDoctor;
