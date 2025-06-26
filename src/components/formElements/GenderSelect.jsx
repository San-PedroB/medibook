// src/components/formElements/GenderSelect.jsx
import React from "react";
import { Form } from "react-bootstrap";

export default function GenderSelect({
  value = "",
  onChange = () => {},
  controlId = "gender",
  label = "Sexo/Género",
  isInvalid = false,
  name,
  required,
  disabled,
  // Si tienes más props estándar de HTML, agrégalas arriba
  // No incluyas ...props
}) {
  return (
    <Form.Group controlId={controlId} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
        name={name}
        required={required}
        disabled={disabled}
        // No más {...props} aquí
      >
        <option value="">Seleccione género</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="Otro">Otro</option>
      </Form.Select>
    </Form.Group>
  );
}
