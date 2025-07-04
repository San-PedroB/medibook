import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { triggerAnimation } from "../../utils/animationUtils";
import { createDoctor } from "../../services/doctorService";
import { getSpecialtiesByCompany } from "../../services/specialtyService";
import { useAuth } from "../../context/AuthContext";
import DoctorForm from "../../components/doctor/DoctorForm";


export default function CreateDoctor() {
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

  const handleRegister = async (doctorData) => {
    setErrorMessage("");
    try {
      setIsSubmitting(true);

      await createDoctor({
        ...doctorData,
        companyId: user.companyId,
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
        <DoctorForm
          onSubmit={handleRegister}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          availableSpecialties={availableSpecialties}
          submitText="Registrar"
          showObligatoryNote={true}
        />
      </div>
    </div>
  );
}
