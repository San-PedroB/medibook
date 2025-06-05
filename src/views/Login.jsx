// src/views/Login.jsx

import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUserData, loginUser } from "../services/firebaseService";

// Microcomponentes
import EmailInput from "../components/formElements/EmailInput";
import PasswordInput from "../components/formElements/PasswordInput";
import AuthForm from "../components/AuthForm";

// Utils
import useFormField from "../hooks/useFormField";
import { validateFields } from "../utils/formUtils";
import { triggerAnimation } from "../utils/animationUtils";


function Login() {
  const emailField = useFormField();
  const passwordField = useFormField();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    const user = await loginUser({
      email: emailField.value,
      password: passwordField.value,
    });
  
    const userData = await getCurrentUserData();

if (userData.role === "admin") {
  navigate("/admin-dashboard");
} else if (userData.role === "agent") {
  navigate("/admin-dashboard");
} else if (userData.role === "patient") {
  navigate("/user-dashboard");
}
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <AuthForm
          onSubmit={handleLogin}
          fields={[
            <EmailInput key="email" {...emailField} label="Correo electrónico" />,
            <PasswordInput key="password" {...passwordField} label="Contraseña" />,
          ]}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          errorRef={errorRef}
          submitText="Entrar"
          footer={
            <>
            <Link to="/patient-register" className="btn btn-link">
              ¿Registrar como Paciente? Click aquí
            </Link>
            <Link to="/register" className="btn btn-link">
              ¿Registrar a tu Empresa? Click aquí
            </Link>
            </>
          }
        />
      </div>
    </div>
  );
}

export default Login;
