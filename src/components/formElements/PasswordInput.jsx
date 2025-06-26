import React from 'react';
import { Form } from 'react-bootstrap';
import FieldError from './FieldError';

export default function PasswordInput({
  name,
  label = 'Contraseña',
  value = '',
  onChange = () => {},
  controlId,
  placeholder = '********',
  isInvalid = false,
  errorMessage = '',
}) {
  return (
    <Form.Group controlId={controlId || name} className='mb-3'>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type='password'
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete='off'
        isInvalid={isInvalid}
      />
      {/* Helper fijo, siempre visible */}
      <Form.Text className='text-muted d-block mb-1'>
        8-32 caracteres. Debe contener mayúscula y número.
      </Form.Text>
      <FieldError message={errorMessage} />
    </Form.Group>
  );
}
