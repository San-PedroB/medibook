// src/views/RegisterPatient.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerPatient } from "../services/firebaseService";
import PhoneInput from "../components/formElements/PhoneInput";
import useFormField from "../hooks/useFormField";
import { validateFields } from "../utils/formUtils";
import { triggerAnimation } from "../utils/animationUtils";
import EmailInput from "../components/formElements/EmailInput";
import PasswordInput from "../components/formElements/PasswordInput";
import AuthForm from "../components/AuthForm";
import BirthDateInput from "../components/formElements/BirthDateInput";
import GenderInput from "../components/formElements/GenderInput";
import NameInput from "../components/formElements/NameInput";



function PatientRegister() {
  const fullNameField = useFormField();
  const emailField = useFormField();
  const passwordField = useFormField();
  const phoneField = useFormField();
  const birthDateField = useFormField();
  const genderField = useFormField();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = [
      fullNameField.value,
      emailField.value,
      passwordField.value,
      birthDateField.value,
      genderField.value,
    ];

    if (!validateFields(fields)) {
      setErrorMessage("Por favor completa todos los campos.");
      triggerAnimation(errorRef, "animate__headShake");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerPatient({
        fullName: fullNameField.value,
        email: emailField.value,
        password: passwordField.value,
        phone: phoneField.value,
        birthDate: birthDateField.value,
        gender: genderField.value,
      });

      navigate("/"); // Redirige al home o login
    } catch (error) {
      setErrorMessage("Error al registrar paciente.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Registro de Paciente</h2>
        <AuthForm
          onSubmit={handleSubmit}
          fields={[
            <NameInput key="name" {...fullNameField} label="Nombre completo" />,
            <EmailInput key="email" {...emailField} label="Correo electrónico" />,
            <PasswordInput key="password" {...passwordField} label="Contraseña" />,
            <PhoneInput key="phone" {...phoneField} label="Número de teléfono" />,
            <BirthDateInput key="birthDate" {...birthDateField} label="Fecha de nacimiento (YYYY-MM-DD)" />,
            <GenderInput key="gender" {...genderField} label="Género" />,
          ]}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          errorRef={errorRef}
          submitText="Registrarse"
        />
      </div>
    </div>
  );
}

export default PatientRegister;
