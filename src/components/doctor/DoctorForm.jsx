import React, { useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import Select from "react-select";

import NameInput from "../formElements/NameInput";
import EmailInput from "../formElements/EmailInput";
import RutInput from "../formElements/RutInput";
import ErrorMessage from "../formElements/ErrorMessage";
import useFormField from "../../hooks/useFormField";
import { validateFields } from "../../utils/formUtils";

export default function DoctorForm({
  initialValues = {},
  onSubmit,
  isSubmitting,
  errorMessage,
  availableSpecialties = [],
  submitText = "Registrar",
  showObligatoryNote = true,
}) {
  // Hooks por campo, con valores iniciales si llegan
  const firstName        = useFormField(initialValues.firstName ?? "");
  const paternalLastName = useFormField(initialValues.paternalLastName ?? "");
  const maternalLastName = useFormField(initialValues.maternalLastName ?? "");
  const rut              = useFormField(initialValues.rut ?? "");
  const email            = useFormField(initialValues.email ?? "");
  const specialties      = useFormField(initialValues.specialties ?? []);

  // Si cambian los valores iniciales (edición), los actualiza en los hooks
  useEffect(() => {
    firstName.setValue(initialValues.firstName ?? "");
    paternalLastName.setValue(initialValues.paternalLastName ?? "");
    maternalLastName.setValue(initialValues.maternalLastName ?? "");
    rut.setValue(initialValues.rut ?? "");
    email.setValue(initialValues.email ?? "");
    specialties.setValue(initialValues.specialties ?? []);
    // eslint-disable-next-line
  }, [JSON.stringify(initialValues)]);

  // Opciones para react-select
  const specialtyOptions = availableSpecialties.map((spec) => ({
    value: spec.name,
    label: spec.name,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = [
      firstName.value,
      paternalLastName.value,
      maternalLastName.value,
      rut.value,
      email.value,
      specialties.value
    ];

    if (!validateFields(values)) {
      return;
    }

    onSubmit({
      firstName: firstName.value,
      paternalLastName: paternalLastName.value,
      maternalLastName: maternalLastName.value,
      rut: rut.value,
      email: email.value,
      specialties: specialties.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {showObligatoryNote && (
        <div className="mb-3">
          <Form.Text className="text-muted">
            * Todos los campos son obligatorios
          </Form.Text>
        </div>
      )}
      {errorMessage && <ErrorMessage message={errorMessage} />}

      <NameInput {...firstName} label="Nombre" />
      <NameInput {...paternalLastName} label="Apellido Paterno" />
      <NameInput {...maternalLastName} label="Apellido Materno" />
      <RutInput {...rut} label="RUT" />
      <EmailInput {...email} label="Correo Electrónico" />

      <Form.Group controlId="specialties" className="mb-3">
        <Form.Label>Especialidades</Form.Label>
        <Select
          isMulti
          placeholder="Seleccione una o más..."
          options={specialtyOptions}
          value={specialtyOptions.filter(opt => specialties.value.includes(opt.value))}
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(opt => opt.value);
            specialties.onChange({ target: { value: selectedValues } });
          }}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isSubmitting} className="w-100">
        {isSubmitting ? <Spinner animation="border" size="sm" /> : submitText}
      </Button>
    </Form>
  );
}
