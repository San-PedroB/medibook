// src/components/formElements/RutInput.jsx
import React from 'react';
import { Form } from 'react-bootstrap';
import FieldError from './FieldError';

export default function RutInput({
  name = "rut",
  label = "RUT",
  value = "",
  onChange = () => {},
  controlId,
  isInvalid = false,
  errorMessage = "",
  hasSubmitted = false,
}) {
  const isEmptyError = hasSubmitted && value.trim() === '';

  return (
    <Form.Group controlId={controlId || name} className='mb-3'>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type='text'
        name={name}
        value={value}
        onChange={onChange}
        autoComplete='off'
        maxLength={12}
        isInvalid={isInvalid || isEmptyError}
      />
      {/* Helper fijo, siempre visible */}
      <Form.Text className='text-muted d-block mb-1'>
        Formato: 12345678-9
      </Form.Text>
      <FieldError message={errorMessage || (isEmptyError ? 'Este campo es obligatorio' : '')} />
    </Form.Group>
  );
}
