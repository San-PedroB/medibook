// src/components/formElements/PhoneInput.jsx
import React from 'react';
import { Form } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

export default function PhoneInputField({ field, controlId, label = 'Teléfono' }) {
  return (
    <Form.Group controlId={controlId} className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <PhoneInput
        country="cl"
        value={field.value}
        onChange={phone => field.onChange({ target: { value: phone } })}
        enableAreaCodes
        enableSearch
        containerStyle={{ width: '100%' }}
        inputStyle={{
          width: '100%',
          height: 'calc(1.5em + 0.75rem + 2px)',
          padding: '0.375rem 0.75rem 0.375rem 4rem',
          fontSize: '1rem',
          lineHeight: '1.5',
          border: '1px solid #CED4DA',
          borderRadius: '.25rem'
        }}
        buttonStyle={{ border: 'none', zIndex: 2 }}
      />
    </Form.Group>
  );
}