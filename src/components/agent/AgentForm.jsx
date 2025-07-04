import React, { useState, useEffect } from "react";
import NameInput from "../formElements/NameInput";
import EmailInput from "../formElements/EmailInput";
import PasswordInput from "../formElements/PasswordInput";
import RutInput from "../formElements/RutInput";
import ErrorMessage from "../formElements/ErrorMessage";
import SubmitButton from "../formElements/SubmitButton";
import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";
import { passwordsMatch } from "../../utils/passwordUtils";

export default function AgentForm({
  initialValues = {},
  onSubmit,
  isSubmitting,
  errorMessage,
  submitText = "Registrar Agente",
  showPassword = true, // puedes esconder los campos de contraseña en edición
}) {
  const firstName = useFormField(initialValues.firstName ?? "");
  const lastName = useFormField(initialValues.lastName ?? "");
  const secondLastName = useFormField(initialValues.secondLastName ?? "");
  const rut = useFormField(initialValues.rut ?? "");
  const email = useFormField(initialValues.email ?? "");
  // Los campos de password solo si showPassword es true
  const password = useFormField("");
  const confirmPassword = useFormField("");

  const [error, setError] = useState("");

  useEffect(() => {
    setError(""); // Limpia error al cambiar valores iniciales
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Campos a validar
    const baseFields = [
      firstName.value,
      lastName.value,
      secondLastName.value,
      rut.value,
      email.value,
    ];
    const allFields = showPassword
      ? [...baseFields, password.value, confirmPassword.value]
      : baseFields;

    if (!validateFields(allFields)) {
      setError("Complete todos los campos");
      return;
    }

    if (showPassword && !passwordsMatch(password.value, confirmPassword.value)) {
      setError("Las contraseñas no coinciden");
      password.reset();
      confirmPassword.reset();
      return;
    }

    setError("");

    // Datos para submit
    let formValues = {
      firstName: firstName.value,
      lastName: lastName.value,
      secondLastName: secondLastName.value,
      rut: rut.value,
      email: email.value,
    };

    if (showPassword) {
      formValues = { ...formValues, password: password.value };
    }

    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <NameInput {...firstName} label="Nombre" />
      <NameInput {...lastName} label="Primer apellido" />
      <NameInput {...secondLastName} label="Segundo apellido" />
      <RutInput {...rut} label="RUT" />
      <EmailInput {...email} label="Correo electrónico" />
      {showPassword && (
        <>
          <PasswordInput {...password} label="Contraseña" />
          <PasswordInput {...confirmPassword} label="Confirmar contraseña" />
        </>
      )}
      {(error || errorMessage) && (
        <ErrorMessage message={error || errorMessage} />
      )}
      <div className="d-grid mt-3">
        <SubmitButton isSubmitting={isSubmitting} text={submitText} />
      </div>
    </form>
  );
}
