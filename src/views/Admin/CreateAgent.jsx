// src/views/Register.jsx
import { auth } from "../../firebase/firebaseConfig";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerAgent } from "../../services/userService";

// Microcomponentes
import NameInput from "../../components/formElements/NameInput";
import EmailInput from "../../components/formElements/EmailInput";
import PasswordInput from "../../components/formElements/PasswordInput";
import AuthForm from "../../components/auth/AuthForm";


// Utils y hooks
import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";
import { passwordsMatch } from "../../utils/passwordUtils";
import { triggerAnimation } from "../../utils/animationUtils";

function CreateAgent() {
  const name = useFormField();
  const lastName = useFormField();
  const secondLastName = useFormField();
  const email = useFormField();
  const password = useFormField();
  const confirmPassword = useFormField();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();

const handleRegister = async (e) => {
  e.preventDefault();

  const fields = [name.value, lastName.value, secondLastName.value, email.value, password.value, confirmPassword.value];

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

  const currentUserBefore = auth.currentUser;
  console.log("ANTES:", currentUserBefore?.uid, currentUserBefore?.email);
try {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.log("❌ No hay usuario autenticado");
    setErrorMessage("Debes estar autenticado para registrar un agente.");
    return;
  }

  console.log("✅ Usuario autenticado:", currentUser.uid);

  // Refresca el token explícitamente
  const token = await currentUser.getIdToken(true);
  console.log("✅ Token refrescado:", token);

  const result = await registerAgent({
    name: name.value,
    lastName: lastName.value,
    secondLastName: secondLastName.value,
    email: email.value,
    password: password.value,
  });

  console.log("✅ Agente registrado correctamente:", result); // <-- este es clave

  setTimeout(() => {
  navigate("/agents");
}, 1000); 


} catch (error) {
  console.error("❌ Error desde frontend al registrar agente:", error); // <-- este también
  setErrorMessage("Error al registrar agente");
}

};



  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Registrar Agente</h2>
        <AuthForm
          onSubmit={handleRegister}
          fields={[
            <NameInput key="name" {...name} label="Nombre" />,
            <NameInput key="lastName" {...lastName} label="Primer apellido" />,
            <NameInput key="secondLastName" {...secondLastName} label="Segundo apellido" />,
            <EmailInput key="email" {...email} label="Correo electrónico" />,
            <PasswordInput key="password" {...password} label="Contraseña" />,
            <PasswordInput key="confirm" {...confirmPassword} label="Confirmar contraseña" />,
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

export default CreateAgent;
