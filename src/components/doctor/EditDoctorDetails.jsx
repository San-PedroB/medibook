import { useEffect, useState, useRef } from "react";
import { getDoctorById, updateDoctorById } from "../../services/firebaseService";
import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";
import { triggerAnimation } from "../../utils/animationUtils";
import { useNavigate } from "react-router-dom";

// Inputs personalizados, igual que para agente, si tienes:
import NameInput from "../formElements/NameInput";
import EmailInput from "../formElements/EmailInput";
import SpecialtyInput from "../formElements/SpecialtyInput"; // Si tienes un input especial para especialidad
import PhoneInput from "../formElements/PhoneInput";
import SubmitButton from "../formElements/SubmitButton";
import ErrorMessage from "../formElements/ErrorMessage";

function EditDoctorDetails({ doctorId }) {
  const name = useFormField();
  const email = useFormField();
  const specialty = useFormField();
  const phone = useFormField();

  const errorRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctor = await getDoctorById(doctorId);
        name.setValue(doctor.name || "");
        email.setValue(doctor.email || "");
        specialty.setValue(doctor.specialty || "");
        phone.setValue(doctor.phone || "");
      } catch {
        setErrorMessage("Error al cargar los datos del médico.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = [name.value, email.value, specialty.value, phone.value];

    if (!validateFields(fields)) {
      setErrorMessage("Complete todos los campos.");
      triggerAnimation(errorRef, "animate__headShake");
      return;
    }

    setIsSubmitting(true);

    try {
      await updateDoctorById(doctorId, {
        name: name.value,
        email: email.value,
        specialty: specialty.value,
        phone: phone.value,
      });
      navigate("/doctors"); // O la ruta donde esté la lista de médicos
    } catch (err) {
      console.error("❌ Error al actualizar médico:", err);
      setErrorMessage("No se pudo actualizar el médico.");
      triggerAnimation(errorRef, "animate__headShake");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="container mt-3">Cargando datos del médico...</div>;

  return (
    <form onSubmit={handleSubmit} className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
      <NameInput {...name} label="Nombre completo" />
      <EmailInput {...email} label="Correo electrónico" />
      <SpecialtyInput {...specialty} label="Especialidad" />
      <PhoneInput {...phone} label="Teléfono" />

      {errorMessage && <ErrorMessage message={errorMessage} forwardedRef={errorRef} />}
      <SubmitButton text="Guardar Cambios" isSubmitting={isSubmitting} />
    </form>
  );
}

export default EditDoctorDetails;
