// src/components/formElements/PasswordInput.jsx
import React from 'react';
import FieldError from './FieldError';

export default function PasswordInput({
  name,
  label = 'Contraseña',
  value = '',
  onChange = () => {},
  controlId,
  placeholder = '********',
  isInvalid = false,
  errorMessage = ''
}) {
  return (
    <div className='mb-3'>
      <label htmlFor={controlId || name} className='form-label'>{label}</label>
      <input
        type='password'
        name={name}
        id={controlId || name}
        className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete='off'
      />
      <FieldError message={errorMessage} />
    </div>
  );
}
