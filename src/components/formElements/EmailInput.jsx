import React from 'react';
import { Form } from 'react-bootstrap';
import FieldError from './FieldError';

export default function EmailInput({
  name,
  label = 'Correo electrónico',
  value = '',
  onChange = () => {},
  controlId,
  placeholder = 'correo@dominio.com',
  isInvalid = false,
  errorMessage = '',
}) {
  return (
    <Form.Group controlId={controlId || name} className='mb-3'>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type='email'
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete='off'
        isInvalid={isInvalid}
      />
      {/* Helper fijo, siempre visible */}
      <Form.Text className='text-muted d-block mb-1'>
        Formato: usuario@dominio.com
      </Form.Text>
      <FieldError message={errorMessage} />
    </Form.Group>
  );
}
