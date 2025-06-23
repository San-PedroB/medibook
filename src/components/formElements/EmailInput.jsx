// src/components/formElements/EmailInput.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

export default function EmailInput({ field, value, onChange, controlId, label = 'Email', placeholder = '' }) {
  const inputValue = field ? field.value : value;
  const handleChange = field ? field.onChange : onChange;

  return (
    <Form.Group controlId={controlId} className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type="email"
        placeholder={placeholder}
        value={inputValue || ''}
        onChange={handleChange}
      />
    </Form.Group>
  );
}