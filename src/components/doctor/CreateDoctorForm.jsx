// === src/components/doctor/CreateDoctorForm.jsx ===
import React from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import Select from "react-select";

//microcomponentes
import NameInput from "../../components/formElements/NameInput";
import EmailInput from "../../components/formElements/EmailInput";
import RutInput from "../../components/formElements/RutInput";
import ErrorMessage from "../formElements/ErrorMessage";



export default function CreateDoctorForm({
  formFields,
  onSubmit,
  isSubmitting,
  errorMessage,
  errorRef,
  availableSpecialties
}) {
  // Adaptar lista para react-select
  const specialtyOptions = availableSpecialties.map((spec) => ({
    value: spec.name,
    label: spec.name
  }));

  return (
<Form onSubmit={onSubmit}>
  {errorMessage && (
    <ErrorMessage message={errorMessage} forwardedRef={errorRef} />
  )}
      <NameInput
        {...formFields.firstName}
        label="Nombre"
        key="firstName"
      />
      <NameInput
        {...formFields.paternalLastName}
        label="Apellido Paterno"
        key="paternalLastName"
      />
      <NameInput
        {...formFields.maternalLastName}
        label="Apellido Materno"
        key="maternalLastName"
      />

      <RutInput
        {...formFields.rut}
        label="RUT"
        key="rut"
      />

      <EmailInput
        {...formFields.email}
        label="Correo Electrónico"
        key="email"
      />

      <Form.Group controlId="specialties" className="mb-3">
        <Form.Label>Especialidades</Form.Label>
        <Select
          isMulti
          placeholder="Seleccione una o mas..."
          options={specialtyOptions}
          value={specialtyOptions.filter(opt => formFields.specialties.value.includes(opt.value))}
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(opt => opt.value);
            formFields.specialties.onChange({ target: { value: selectedValues } });
          }}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isSubmitting} className="w-100">
        {isSubmitting ? <Spinner animation="border" size="sm" /> : "Registrar"}
      </Button>
    </Form>
  );
}
