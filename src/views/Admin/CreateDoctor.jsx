// === src/views/Doctors/CreateDoctor.jsx ===
import { React, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";
import { triggerAnimation } from "../../utils/animationUtils";
import { createDoctor } from "../../services/doctorService";
import { getSpecialtiesByCompany } from "../../services/specialtyService";
import { useAuth } from "../../context/AuthContext";
import CreateDoctorForm from "../../components/doctor/CreateDoctorForm";

export default function CreateDoctor() {
  const firstName        = useFormField();
  const paternalLastName = useFormField();
  const maternalLastName = useFormField();
  const email            = useFormField();
  const specialties      = useFormField([]); // ← array
  const formFields       = { firstName, paternalLastName, maternalLastName, email, specialties };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [availableSpecialties, setAvailableSpecialties] = useState([]);

  const errorRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.companyId) return;

    const fetchSpecialties = async () => {
      try {
        const data = await getSpecialtiesByCompany(user.companyId);
        setAvailableSpecialties(data);
      } catch (error) {
        console.error("Error al cargar especialidades:", error);
      }
    };

    fetchSpecialties();
  }, [user]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const values = [
      firstName.value,
      paternalLastName.value,
      maternalLastName.value,
      email.value,
      specialties.value
    ];

    if (!validateFields(values)) {
      setErrorMessage("Complete todos los campos");
      triggerAnimation(errorRef, "animate__headShake");
      return;
    }

    try {
      setIsSubmitting(true);

      await createDoctor({
        firstName:        firstName.value,
        paternalLastName: paternalLastName.value,
        maternalLastName: maternalLastName.value,
        email:            email.value,
        specialties:      specialties.value,
        companyId:        user.companyId,
      });

      navigate("/doctor-list");
    } catch (err) {
      console.error(err);
      setErrorMessage("Error al registrar médico");
      triggerAnimation(errorRef, "animate__headShake");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Registrar Médico</h2>
        <CreateDoctorForm
          formFields={formFields}
          onSubmit={handleRegister}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          errorRef={errorRef}
          availableSpecialties={availableSpecialties}
        />
      </div>
    </div>
  );
}
