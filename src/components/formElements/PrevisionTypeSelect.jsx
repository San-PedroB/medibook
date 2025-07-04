import React from "react";
import { Form } from "react-bootstrap";

export default function PrevisionTypeSelect({
  value = "",
  onChange = () => {},
  controlId = "previsionType",
  label = "Tipo de previsión",
  isInvalid = false,
  name,
  required,
  disabled,
  // agrega más props estándar si quieres...
  // reset, setValue, ... otros props custom SOLO ÚSALOS DENTRO del componente, no los pases al select
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
        <option value="">Seleccione previsión</option>
        <option value="Fonasa">Fonasa</option>
        <option value="Isapre">Isapre</option>
        <option value="Otro">Otro</option>
      </Form.Select>
    </Form.Group>
  );
}
