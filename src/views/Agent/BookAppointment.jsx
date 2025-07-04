import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Inputs
import NameInput from "../../components/formElements/NameInput";
import IdInput from "../../components/formElements/IdInput";
import SpecialtyInput from "../../components/formElements/SpecialtyInput";
import PhoneInput from "../../components/formElements/PhoneInput";
import TimeSelectInput from "../../components/formElements/TimeSelectInput";
import DescriptionInput from "../../components/formElements/DescriptionInput"; // Importa aquí
import AuthForm from "../../components/auth/AuthForm";

// Utils
import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";
import { triggerAnimation } from "../../utils/animationUtils";

function BookAppointment() {
  // Usamos el hook para cada input
  const rut = useFormField();
  const fullName = useFormField();
  const phone = useFormField();
  const specialty = useFormField();
  const time = useFormField();
  const description = useFormField();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const fields = [
      rut.value,
      fullName.value,
      phone.value,
      specialty.value,
      time.value,
    ];

    if (!validateFields(fields)) {
      setErrorMessage("Complete todos los campos");
      triggerAnimation(errorRef, "animate__headShake");
      return;
    }

    setIsSubmitting(true);

    try {
      // Aquí va tu lógica para agendar la cita (guardar en Firestore, etc.)
      console.log("Datos agendados:", {
        rut: rut.value,
        fullName: fullName.value,
        phone: phone.value,
        specialty: specialty.value,
        time: time.value,
      });

      navigate("/appointments-calendar");
    } catch (error) {
      console.error("❌ Error al agendar cita:", error);
      setErrorMessage("Error al agendar cita");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Agendar una Cita</h2>
        <AuthForm
          onSubmit={handleRegister}
          fields={[
            <IdInput key="rut" {...rut} label="RUT" />,
            <SpecialtyInput key="specialty" {...specialty} label="Especialidad" />,
            <TimeSelectInput key="time" {...time} label="Horario" />,
            <DescriptionInput key="description" {...description} label="Descripción breve" />, 
          ]}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          errorRef={errorRef}
          submitText="Agendar"
        />
      </div>
    </div>
  );
}

export default BookAppointment;
