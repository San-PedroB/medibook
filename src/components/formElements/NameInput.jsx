// src/components/formElements/NameInput.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

/**
 * NameInput: input de texto con Form.Group para consistencia de estilos.
 * Props:
 *  - field: { value, onChange } (opcional)
 *  - value: string (opcional)
 *  - onChange: function (opcional)
 *  - controlId: string
 *  - label: string
 *  - placeholder: string
 */
export default function NameInput({ field, value, onChange, controlId, label, placeholder = '' }) {
  const inputValue = field ? field.value : value;
  const handleChange = field ? field.onChange : onChange;

  return (
    <Form.Group controlId={controlId} className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={inputValue || ''}
        onChange={handleChange}
      />
    </Form.Group>
  );
}