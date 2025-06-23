// src/components/formElements/CountrySelect.jsx
import React from 'react';
import { Form } from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector';

export default function CountrySelect({ field, controlId, label = 'Nacionalidad' }) {
  return (
    <Form.Group controlId={controlId} className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <CountryDropdown
        value={field.value}
        onChange={val => field.onChange({ target: { value: val } })}
        defaultOptionLabel="Seleccione nacionalidad"
        classes="form-select"
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
    </Form.Group>
  );
}