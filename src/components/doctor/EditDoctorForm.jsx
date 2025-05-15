// /components/doctor/EditDoctorForm.jsx

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { updateDoctor } from "../../services/doctorService";

import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";
import { triggerAnimation } from "../../utils/animationUtils";

// Microcomponentes
import NameInput from "../formElements/NameInput";
import EmailInput from "../formElements/EmailInput";
import SubmitButton from "../formElements/SubmitButton";
import ErrorMessage from "../formElements/ErrorMessage";

function EditDoctorForm({ doctorId }) {
  const name = useFormField();
  const email = useFormField();
  const specialties = useFormField();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctorRef = doc(db, "doctors", doctorId);
        const doctorSnap = await getDoc(doctorRef);
        if (!doctorSnap.exists()) throw new Error();

        const data = doctorSnap.data();
        name.setValue(data.name || "");
        email.setValue(data.email || "");
        specialties.setValue(data.specialties?.join(", ") || "");
      } catch (error) {
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

    const fields = [name.value, email.value, specialties.value];
    if (!validateFields(fields)) {
      setErrorMessage("Complete todos los campos.");
      triggerAnimation(errorRef, "animate__headShake");
      return;
    }

    try {
      setIsSubmitting(true);
      await updateDoctor(doctorId, {
        name: name.value,
        email: email.value,
        specialties: specialties.value.split(",").map((s) => s.trim()),
      });
      navigate("/doctor-list");
    } catch (error) {
      console.error("❌ Error al actualizar médico:", error);
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
      <div className="mb-3">
        <label className="form-label">Especialidades</label>
        <input
          type="text"
          className="form-control"
          value={specialties.value}
          onChange={specialties.onChange}
          placeholder="Ej: Ginecología, Traumatología"
        />
      </div>

      {errorMessage && <ErrorMessage message={errorMessage} forwardedRef={errorRef} />}
      <SubmitButton text="Guardar Cambios" isSubmitting={isSubmitting} />
    </form>
  );
}

export default EditDoctorForm;
