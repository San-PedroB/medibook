// === src/components/doctor/EditDoctorForm.jsx ===
import React from "react";
import NameInput from "../formElements/NameInput";
import EmailInput from "../formElements/EmailInput";
import ErrorMessage from "../formElements/ErrorMessage";
import SubmitButton from "../formElements/SubmitButton";
import Select from "react-select";

export default function EditDoctorForm({
  formFields: { firstName, paternalLastName, maternalLastName, email, specialties },
  onSubmit,
  isSubmitting,
  errorMessage,
  errorRef,
  availableSpecialties
}) {
  const specialtyOptions = availableSpecialties.map((spec) => ({
    value: spec.name,
    label: spec.name
  }));

  return (
    <form onSubmit={onSubmit} className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
      <NameInput key="firstName" {...firstName} label="Nombre" />
      <NameInput key="paternalLastName" {...paternalLastName} label="Apellido Paterno" />
      <NameInput key="maternalLastName" {...maternalLastName} label="Apellido Materno" />
      <EmailInput key="email" {...email} label="Correo Electrónico" />

      <div className="mb-3">
        <label className="form-label">Especialidades</label>
        <Select
          isMulti
          placeholder="Seleccione una o mas..."
          options={specialtyOptions}
          value={specialtyOptions.filter(opt => specialties.value.includes(opt.value))}
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(opt => opt.value);
            specialties.onChange({ target: { value: selectedValues } });
          }}
        />
      </div>

      {errorMessage && <ErrorMessage message={errorMessage} forwardedRef={errorRef} />}
      
      <div className="d-grid">
        <SubmitButton text="Guardar Cambios" isSubmitting={isSubmitting} />
      </div>
    </form>
  );
}
