import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";
import { triggerAnimation } from "../../utils/animationUtils";
import { createPatient } from "../../services/patientService";
import { useAuth } from "../../context/AuthContext";
import CreatePatientForm from "../../components/patient/CreatePatientForm";

export default function CreatePatientView() {
  const { user } = useAuth();
  const errorRef = useRef(null);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Hooks para cada campo
  const firstName     = useFormField();
  const lastName      = useFormField();
  const rutNumber     = useFormField();
  const rutDv         = useFormField();
  const phone         = useFormField();
  const email         = useFormField();
  const birthDate     = useFormField();
  const previsionType = useFormField();
  const nationality   = useFormField();
  const address       = useFormField();
  const gender        = useFormField();

  const formFields = {
    firstName,
    lastName,
    rutNumber,
    rutDv,
    phone,
    email,
    birthDate,
    previsionType,
    nationality,
    address,
    gender
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const values = [
      firstName.value,
      lastName.value,
      rutNumber.value,
      rutDv.value,
      phone.value,
      email.value,
      birthDate.value,
      previsionType.value,
      nationality.value,
      address.value,
      gender.value
    ];

    if (!validateFields(values)) {
      setErrorMessage("Complete todos los campos");
      triggerAnimation(errorRef, "animate__headShake");
      return;
    }

    try {
      setIsSubmitting(true);
      const fullRut = `${rutNumber.value}-${rutDv.value}`;
      await createPatient({
        firstName:     firstName.value,
        lastName:      lastName.value,
        rut:           fullRut,
        phone:         phone.value,
        email:         email.value,
        birthDate:     birthDate.value,
        previsionType: previsionType.value,
        nationality:   nationality.value,
        address:       address.value,
        gender:        gender.value,
        companyId:     user.companyId,
        createdBy:     user.uid
      });
      navigate("/patient-list");
    } catch (err) {
      console.error(err);
      setErrorMessage("Error al registrar paciente");
      triggerAnimation(errorRef, "animate__headShake");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return <p>Cargando usuario...</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "800px" }}>
        <h2 className="text-center mb-4">Registrar paciente</h2>
        <CreatePatientForm
          formFields={formFields}
          onSubmit={handleRegister}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          errorRef={errorRef}
        />
      </div>
    </div>
  );
}
