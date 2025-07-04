import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

import AuthForm from "../auth/AuthForm";
import NameInput from "../formElements/NameInput";
import RutInput from "../formElements/RutInput";
import PhoneInput from "../formElements/PhoneInput";
import EmailInput from "../formElements/EmailInput";
import PasswordInput from "../formElements/PasswordInput";
import TextInput from "../formElements/TextInput";

import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";
import { passwordsMatch } from "../../utils/passwordUtils";
import { triggerAnimation } from "../../utils/animationUtils";
import { registerAdminWithCompany } from "../../services/userService";

// Componente para secciones visuales
function Section({ title, children }) {
  return (
    <div className="p-3 border rounded mb-4">
      <h5 className="mb-3">{title}</h5>
      {children}
    </div>
  );
}

export default function RegisterAdminCompanyForm() {
  const navigate = useNavigate();
  const errorRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Hooks de campos
  const firstName       = useFormField();
  const lastNameP       = useFormField();
  const lastNameM       = useFormField();
  const rutAdmin        = useFormField();
  const phoneAdmin      = useFormField();
  const name            = useFormField();
  const businessName    = useFormField();
  const rutCompany      = useFormField();
  const industry        = useFormField();
  const phoneCompany    = useFormField();
  const street          = useFormField();
  const number          = useFormField();
  const office          = useFormField(); // opcional
  const city            = useFormField();
  const website         = useFormField(); // opcional
  const email           = useFormField();
  const password        = useFormField();
  const confirmPassword = useFormField();

  // Validador de campo con useCallback
  const fieldInvalid = useCallback(
    field => hasSubmitted && !field.value.trim(),
    [hasSubmitted]
  );

  // Configuración de secciones y campos (dentro del componente)
  const sectionsConfig = [
    {
      title: "Datos del Administrador",
      fields: [
        { component: NameInput,       hook: firstName,       label: "Nombre",           required: true },
        { component: NameInput,       hook: lastNameP,       label: "Apellido paterno", required: true },
        { component: NameInput,       hook: lastNameM,       label: "Apellido materno", required: true },
        { component: RutInput,        hook: rutAdmin,        label: "RUT",              helpText: "Formato: 12.345.678-9", required: true },
        { component: PhoneInput,      hook: phoneAdmin,      label: "Teléfono",         required: true }
      ]
    },
    {
      title: "Datos de la Empresa",
      fields: [
        { component: TextInput,       hook: name,            label: "Nombre empresa",    required: true },
        { component: TextInput,       hook: businessName,    label: "Razón social",      required: true },
        { component: RutInput,        hook: rutCompany,      label: "RUT empresa",       helpText: "Formato: 12.345.678-9", required: true },
        { component: TextInput,       hook: industry,        label: "Giro",              required: true },
        { component: PhoneInput,      hook: phoneCompany,    label: "Teléfono empresa",  required: true },
        { component: TextInput,       hook: street,          label: "Calle",             required: true },
        { component: TextInput,       hook: number,          label: "Número",            required: true },
        { component: TextInput,       hook: office,          label: "Oficina",           helpText: "Opcional", required: false },
        { component: TextInput,       hook: city,            label: "Ciudad",            required: true },
        { component: TextInput,       hook: website,         label: "Sitio web",         helpText: "Opcional", required: false }
      ]
    },
    {
      title: "Cuenta de Acceso",
      fields: [
        { component: EmailInput,      hook: email,           label: "Correo electrónico", required: true },
        { component: PasswordInput,   hook: password,        label: "Contraseña",         helpText: "Mínimo 8 caracteres, al menos una mayúscula y un número", required: true },
        { component: PasswordInput,   hook: confirmPassword, label: "Confirmar contraseña", helpText: "Deben coincidir con la contraseña", required: true }
      ]
    }
  ];

  // Array de hooks obligatorios 
  const requiredFields = [
    firstName, lastNameP, lastNameM, rutAdmin, phoneAdmin,
    name, businessName, rutCompany, industry, phoneCompany,
    street, number, city, email, password, confirmPassword
  ];

  // Validación general del formulario
  const validateForm = () => {
    setHasSubmitted(true);
    setErrorMessage("");
    const values = requiredFields.map(f => f.value);
    if (!validateFields(values)) {
      setErrorMessage("Complete todos los campos obligatorios");
      triggerAnimation(errorRef, "animate__headShake");
      return false;
    }
    if (!passwordsMatch(password.value, confirmPassword.value)) {
      setErrorMessage("Las contraseñas no coinciden");
      triggerAnimation(errorRef, "animate__headShake");
      password.reset();
      confirmPassword.reset();
      return false;
    }
    return true;
  };

  // Función para registrar admin + empresa
  const submitRegistration = async () => {
    return await registerAdminWithCompany({
      admin: {
        firstName: firstName.value,
        lastNameP: lastNameP.value,
        lastNameM: lastNameM.value,
        rutAdmin: rutAdmin.value,
        phoneAdmin: phoneAdmin.value
      },
      company: {
        name: name.value,
        businessName: businessName.value,
        rutCompany: rutCompany.value,
        industry: industry.value,
        phoneCompany: phoneCompany.value,
        street: street.value,
        number: number.value,
        office: office.value || "",
        city: city.value,
        website: website.value || ""
      },
      account: {
        email: email.value,
        password: password.value,
        acceptTerms: true
      }
    });
  };

  // Submit principal: registro + login automático + redirección
  const handleRegister = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await submitRegistration();
      await signInWithEmailAndPassword(auth, email.value, password.value);

      setErrorMessage("Registro exitoso. Redirigiendo al admin-dashboard...");
      setTimeout(() => navigate("/admin-dashboard"), 1500);

    } catch (err) {
      console.error("❌ Error en registro o login automático:", err);
      setErrorMessage("Error al registrar o iniciar sesión como administrador");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderizado visual de campos y secciones (sin useMemo)
  const fields = sectionsConfig.map((section, idx) => (
    <Section key={idx} title={section.title}>
      <Row className="g-3">
        {section.fields.map((field, i) => {
          const Component = field.component;
          const invalid = field.required && fieldInvalid(field.hook);
          return (
            <Col md={4} key={i}>
              <Component
                {...field.hook}
                label={field.label}
                helpText={field.helpText}
                isInvalid={invalid}
                feedback={invalid ? "Este campo es obligatorio" : undefined}
              />
            </Col>
          );
        })}
      </Row>
    </Section>
  ));

  // Render principal
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "1000px" }}>
        <h2 className="text-center mb-4">Registrar Empresa & Admin</h2>
        <AuthForm
          onSubmit={handleRegister}
          fields={fields}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          errorRef={errorRef}
          submitText="Registrar"
        />
      </div>
    </div>
  );
}