// === src/views/Doctors/EditDoctor.jsx ===
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";
import { triggerAnimation } from "../../utils/animationUtils";
import { getDoctorById, updateDoctor } from "../../services/doctorService";
import { getSpecialtiesByCompany } from "../../services/specialtyService";
import { useAuth } from "../../context/AuthContext";
import EditDoctorForm from "../../components/doctor/EditDoctorForm";

export default function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const firstName = useFormField();
  const paternalLastName = useFormField();
  const maternalLastName = useFormField();
  const email = useFormField();
  const specialties = useFormField([]); // ahora array

  const [availableSpecialties, setAvailableSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const errorRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docData, specialtyList] = await Promise.all([
          getDoctorById(id),
          getSpecialtiesByCompany(user.companyId)
        ]);

        firstName.setValue(docData.firstName || "");
        paternalLastName.setValue(docData.paternalLastName || "");
        maternalLastName.setValue(docData.maternalLastName || "");
        email.setValue(docData.email || "");
        specialties.setValue(docData.specialties || []);

        setAvailableSpecialties(specialtyList);
      } catch (error) {
        setErrorMessage("Error al cargar los datos del médico");
      } finally {
        setLoading(false);
      }
    };

    if (user?.companyId) {
      fetchData();
    }
  }, [id, user]);

  const handleSubmit = async (e) => {
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
      await updateDoctor(id, {
        firstName: firstName.value,
        paternalLastName: paternalLastName.value,
        maternalLastName: maternalLastName.value,
        email: email.value,
        specialties: specialties.value
      });
      navigate("/doctor-list");
    } catch (error) {
      setErrorMessage("No se pudo actualizar el médico");
      triggerAnimation(errorRef, "animate__headShake");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="container mt-3">Cargando datos…</div>;

  const formFields = { firstName, paternalLastName, maternalLastName, email, specialties };

  return (
    <EditDoctorForm
      formFields={formFields}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
      errorRef={errorRef}
      availableSpecialties={availableSpecialties}
    />
  );
}
