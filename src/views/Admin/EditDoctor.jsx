import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DoctorForm from "../../components/doctor/DoctorForm";
import { getDoctorById, updateDoctor } from "../../services/doctorService";
import { getSpecialtiesByCompany } from "../../services/specialtyService";
import { triggerAnimation } from "../../utils/animationUtils";

export default function EditDoctor() {
  const { doctorId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const errorRef = useRef(null);

  const [doctorData, setDoctorData] = useState(null);
  const [availableSpecialties, setAvailableSpecialties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Cargar especialidades y datos del médico
useEffect(() => {
  if (!user?.companyId) return;

  const fetchData = async () => {
    try {
      // 1. Trae especialidades disponibles
      const specialties = await getSpecialtiesByCompany(user.companyId);
      setAvailableSpecialties(specialties);

      // 2. Trae datos del médico a editar
      console.log("Buscando doctorId:", doctorId);
      const doctor = await getDoctorById(doctorId);
      console.log("Datos del médico traído:", doctor);
      setDoctorData(doctor);
    } catch (err) {
      setErrorMessage("No se pudo cargar la información del médico.");
      console.error("Error cargando médico:", err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, [doctorId, user]);



  const handleSubmit = async (formValues) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);
    try {
      await updateDoctor(doctorId, {...formValues, companyId: user.companyId });
      setSuccessMessage("Médico actualizado correctamente.");
      setTimeout(() => navigate("/doctor-list"), 1200);
    } catch (error) {
      setErrorMessage(error.message || "Error al actualizar médico.");
      triggerAnimation(errorRef, "animate__headShake");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p className="text-center my-5">Cargando médico...</p>;
  if (errorMessage && !doctorData) return <p className="text-danger text-center my-5">{errorMessage}</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Editar Médico</h2>
        {successMessage && (
          <div className="alert alert-success text-center" role="alert">
            {successMessage}
          </div>
        )}
        {doctorData && (
          <DoctorForm
            initialValues={doctorData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            errorMessage={errorMessage}
            availableSpecialties={availableSpecialties}
            submitText="Guardar Cambios"
            showObligatoryNote={false}
          />
        )}
      </div>
    </div>
  );
}
