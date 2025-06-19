import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../../services/userService";

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

function UserRegister() {
  const fullName = useFormField();
  const email = useFormField();
  const password = useFormField();
  const confirmPassword = useFormField();
  const companyName = useFormField();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const fields = [
      fullName.value,
      email.value,
      password.value,
      confirmPassword.value,
      companyName.value,
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
      await registerAdmin({
        fullName: fullName.value,
        email: email.value,
        password: password.value,
        companyName: companyName.value,
      });

      navigate("/login");
    } catch (error) {
      setErrorMessage("Error al registrar administrador");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Registro de Empresa</h2>
        <AuthForm
          onSubmit={handleRegister}
          fields={[
            <NameInput key="name" {...fullName} label="Nombre completo" />,
            <EmailInput key="email" {...email} label="Correo electrónico" />,
            <PasswordInput key="password" {...password} label="Contraseña" />,
            <PasswordInput key="confirm" {...confirmPassword} label="Confirmar contraseña" />,
            <NameInput key="company" {...companyName} label="Nombre de la empresa" />,
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

export default UserRegister;
