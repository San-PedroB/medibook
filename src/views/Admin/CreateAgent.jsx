
// src/views/CreateAgent.jsx

import { auth } from "../../firebase/firebaseConfig";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerAgent } from "../../services/userService";

// Microcomponentes
import NameInput from "../../components/formElements/NameInput";
import EmailInput from "../../components/formElements/EmailInput";
import PasswordInput from "../../components/formElements/PasswordInput";
import AuthForm from "../../components/auth/AuthForm";
import RutInput from "../../components/formElements/RutInput";


// Utils y hooks
import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";
import { passwordsMatch } from "../../utils/passwordUtils";
import { triggerAnimation } from "../../utils/animationUtils";

export default function CreateAgent() {
  const firstName = useFormField();
  const lastName = useFormField();
  const secondLastName = useFormField();
  const email = useFormField();
  const password = useFormField();
  const confirmPassword = useFormField();
  const rut = useFormField();


  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();

  const fields = [
    firstName.value,
    lastName.value,
    secondLastName.value,
    rut.value,
    email.value,
    password.value,
    confirmPassword.value
  ];

  if (!validateFields(fields)) {
    setErrorMessage("Complete todos los campos");
    triggerAnimation(errorRef, "animate__headShake");
    return;
  }

  if (!passwordsMatch(password.value, confirmPassword.value)) {
    setErrorMessage("Las contraseñas no coinciden");
    triggerAnimation(errorRef, "animate__headShake");
    password.reset();
    confirmPassword.reset();
    return;
  }

  setIsSubmitting(true);

  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setErrorMessage("Debes estar autenticado para registrar un agente.");
      setIsSubmitting(false);
      return;
    }

    // ——————————————————————————
    // 1. Construye rawData y loguea campo a campo
    const rawData = {
      firstName: firstName.value,
      lastName: lastName.value,
      secondLastName: secondLastName.value,
      rut: rut.value,
      email: email.value,
      password: password.value,
    };
    Object.entries(rawData).forEach(([key, val]) => {
      console.log(`🔍 [Client] ${key}:`, val);
    });
    // ——————————————————————————

    const token = await currentUser.getIdToken(true);
    console.log("✅ Usuario autenticado:", currentUser.uid);
    console.log("✅ Token refrescado:", token);

    // 2. Envía rawData al backend
    const result = await registerAgent(rawData);

    console.log("✅ Agente registrado correctamente:", result.uid);
    navigate("/agent-list");
  } catch (error) {
    console.error("❌ Error desde frontend al registrar agente:", error);
    setErrorMessage(error.message || "Error al crear agente");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Registrar Agente</h2>
        <AuthForm
          onSubmit={handleRegister}
          fields={[
            <NameInput key="firstName" {...firstName} label="Nombre" />, 
            <NameInput key="lastName" {...lastName} label="Primer apellido" />,
            <NameInput key="secondLastName" {...secondLastName} label="Segundo apellido" />,
            <RutInput key="rut" {...rut} label="RUT" />,
            <EmailInput key="email" {...email} label="Correo electrónico" />,
            <PasswordInput key="password" {...password} label="Contraseña" />,
            <PasswordInput key="confirm" {...confirmPassword} label="Confirmar contraseña" />
          ]}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          errorRef={errorRef}
          submitText="Registrar Agente"
        />
      </div>
    </div>
  );
}

