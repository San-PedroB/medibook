// src/components/formElements/RutInput.jsx
import React from 'react';
import { Form } from 'react-bootstrap';
import FieldError from './FieldError';

export default function RutInput({
  name,
  label = 'RUT',
  value = '',
  onChange = () => {},
  controlId,
  placeholder = 'Ej: 18529883-3',
  isInvalid = false,
  errorMessage = ''
}) {
  return (
    <Form.Group controlId={controlId || name} className='mb-3'>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type='text'
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete='off'
        maxLength={10}
        isInvalid={isInvalid}
      />
      <FieldError message={errorMessage} />
    </Form.Group>
  );
}
