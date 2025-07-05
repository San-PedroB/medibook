import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, getCurrentUserData } from "../../services/userService";

// Microcomponentes
import EmailInput from "../../components/formElements/EmailInput";
import PasswordInput from "../../components/formElements/PasswordInput";
import AuthForm from "../../components/auth/AuthForm";

// Utils
import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";
import { triggerAnimation } from "../../utils/animationUtils";

// 👇 IMPORTA EL CONTEXTO DE AUTH
import { useAuth } from "../../context/AuthContext";

function Login() {
  const emailField = useFormField();
  const passwordField = useFormField();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  // 👇 OBTIENE EL USUARIO DEL CONTEXTO
  const { user } = useAuth();

  // 👇 REDIRIGE SI YA ESTÁ LOGUEADO
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "agent") {
        navigate("/agent-dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const fields = [emailField.value, passwordField.value];

    if (!validateFields(fields)) {
      setErrorMessage("Complete todos los campos");
      triggerAnimation(errorRef, "animate__headShake");
      return;
    }

    setIsSubmitting(true);
    try {
      await loginUser({
        email: emailField.value,
        password: passwordField.value,
      });

      const userData = await getCurrentUserData();
      if (!userData) throw new Error("Perfil no encontrado");

      if (userData.role === "admin") {
        navigate("/admin-dashboard");
      } else if (userData.role === "agent") {
        navigate("/agent-dashboard");
      } else {
        setErrorMessage("Rol de usuario no válido");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Credenciales incorrectas");
    } finally {
      setIsSubmitting(false);
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
            <Link to="/register" className="btn btn-link">
              ¿Quieres registrar a tu empresa? Click aquí
            </Link>
          }
        />
      </div>
    </div>
  );
}

export default Login;
