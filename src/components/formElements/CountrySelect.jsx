// src/components/formElements/CountrySelect.jsx
import React from 'react';
import { Form } from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector';
import FieldError from './FieldError';

export default function CountrySelect({
  name,
  label = 'Nacionalidad',
  value = '',
  onChange = () => {},
  controlId,
  isInvalid = false,
  errorMessage = '',
  helpText = ''
}) {
  return (
    <Form.Group controlId={controlId || name} className='mb-3'>
      {label && <Form.Label>{label}</Form.Label>}

      <CountryDropdown
        value={value}
        onChange={val => onChange({ target: { name, value: val } })}
        defaultOptionLabel='Seleccione nacionalidad'
        classes={`form-select ${isInvalid ? 'is-invalid' : ''}`}
        style={{
          width: '100%',
          height: 'calc(1.5em + 0.75rem + 2px)',
          padding: '0.375rem 0.75rem',
          fontSize: '1rem',
          lineHeight: '1.5',
          border: '1px solid #CED4DA',
          borderRadius: '.25rem'
        }}
      />

      {/* Help text justo debajo del dropdown */}
      {helpText && (
        <Form.Text className='text-muted d-block mb-1'>
          {helpText}
        </Form.Text>
      )}

      {/* Mensaje de error */}
      <FieldError message={errorMessage} />
    </Form.Group>
  );
}
