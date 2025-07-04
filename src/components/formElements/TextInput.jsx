import React from 'react';
import { Form } from 'react-bootstrap';
import FieldError from './FieldError';

export default function TextInput({
  name,
  label,
  value = '',
  onChange = () => {},
  controlId,
  isInvalid = false,
  errorMessage = '',
  placeholder = '',
  type = 'text',
  helpText = ''
}) {
  return (
    <Form.Group controlId={controlId || name} className='mb-3'>
      {label && <Form.Label>{label}</Form.Label>}

      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete='off'
        placeholder={placeholder}
        isInvalid={isInvalid}
      />

      {/* <–– Aquí va abajo del input ––> */}
      {helpText && (
        <Form.Text className='text-muted d-block mb-1'>
          {helpText}
        </Form.Text>
      )}

      <FieldError message={errorMessage} />
    </Form.Group>
  );
}
