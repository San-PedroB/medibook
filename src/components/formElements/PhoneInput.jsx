import React from 'react';
import { Form } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import FieldError from './FieldError';

export default function PhoneInputField({
  name = 'phone',
  label = 'Teléfono',
  value = '',
  onChange = () => {},
  country = 'cl',
  onlyCountries = ['cl'],
  isInvalid = false,
  errorMessage = '',
  placeholder = '',
}) {
  return (
    <Form.Group controlId={name} className='mb-3'>
      {label && <Form.Label>{label}</Form.Label>}
      <PhoneInput
        country={country}
        onlyCountries={onlyCountries}
        value={value}
        onChange={phone => onChange({ target: { name, value: phone } })}
        placeholder={placeholder}
        inputProps={{ name, required: true, autoFocus: false }}
        containerStyle={{ width: '100%' }}
        inputStyle={{
          width: '100%',
          height: '38px',
          fontSize: '1rem',
          paddingLeft: '60px',
          paddingRight: '0.75rem',
          border: '1px solid #CED4DA',
          borderRadius: '0.25rem',
          lineHeight: '1.5'
        }}
        buttonStyle={{
          border: '1px solid #CED4DA',
          borderRight: 'none',
          height: '38px',
          backgroundColor: '#fff',
          borderRadius: '0.25rem 0 0 0.25rem'
        }}
        inputClass={isInvalid ? 'is-invalid' : ''}
      />
      {/* Helper fijo, siempre visible */}
      <Form.Text className='text-muted d-block mb-1'>
        Formato: 56912345678
      </Form.Text>
      <FieldError message={errorMessage} />
    </Form.Group>
  );
}
