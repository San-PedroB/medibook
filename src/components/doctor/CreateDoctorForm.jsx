// === src/components/doctor/CreateDoctorForm.jsx ===
import React from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import Select from "react-select";

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
        <Alert ref={errorRef} variant="danger" className="text-center">
          {errorMessage}
        </Alert>
      )}

      <Form.Group controlId="firstName" className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Ana"
          value={formFields.firstName.value}
          onChange={formFields.firstName.onChange}
        />
      </Form.Group>

      <Form.Group controlId="paternalLastName" className="mb-3">
        <Form.Label>Apellido Paterno</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: González"
          value={formFields.paternalLastName.value}
          onChange={formFields.paternalLastName.onChange}
        />
      </Form.Group>

      <Form.Group controlId="maternalLastName" className="mb-3">
        <Form.Label>Apellido Materno</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Rivas"
          value={formFields.maternalLastName.value}
          onChange={formFields.maternalLastName.onChange}
        />
      </Form.Group>

      <Form.Group controlId="email" className="mb-3">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ej: doctor@medibook.cl"
          value={formFields.email.value}
          onChange={formFields.email.onChange}
        />
      </Form.Group>

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
