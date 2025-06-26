// src/components/formElements/DescriptionInput.jsx
import React from 'react';
import { Form } from 'react-bootstrap';
import FieldError from './FieldError';

export default function DescriptionInput({
  name,
  value = '',
  onChange = () => {},
  label = 'Descripción',
  errorMessage = '',
  placeholder = 'Escribe una breve descripción o contexto...',
  helpText = ''
}) {
  return (
    <Form.Group controlId={name} className='mb-3'>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        as='textarea'
        rows={4}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isInvalid={!!errorMessage}
      />
      {helpText && (
        <Form.Text className='text-muted d-block mb-1'>
          {helpText}
        </Form.Text>
      )}
      <FieldError message={errorMessage} />
    </Form.Group>
  );
}