// src/components/formElements/DescriptionInput.jsx
import React from 'react';
import FieldError from './FieldError';

export default function DescriptionInput({
  name,
  value = '',
  onChange = () => {},
  label = 'Descripción',
  errorMessage = '',
  placeholder = 'Escribe una breve descripción o contexto...'
}) {
  return (
    <div className='form-group mb-3'>
      <label htmlFor={name}>{label}</label>
      <textarea
        className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
        rows={4}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <FieldError message={errorMessage} />
    </div>
  );
}