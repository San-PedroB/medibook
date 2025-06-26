import React from 'react';
import { Form } from 'react-bootstrap';
import FieldError from './FieldError';

export default function NameInput({
  name,
  label = 'Nombre',
  value = '',
  onChange = () => {},
  controlId,
  placeholder = '',
  isInvalid = false,
  errorMessage = '',
  helpText = '',
  hasSubmitted = false,
}) {
  const isEmptyError = hasSubmitted && value.trim() === '';

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[0-9]/g, '');
    onChange({ ...e, target: { ...e.target, value: filteredValue } });
  };

  return (
    <Form.Group controlId={controlId || name} className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        autoComplete="off"
        placeholder={placeholder}
        isInvalid={isInvalid || isEmptyError}
      />
      {helpText && <Form.Text className="text-muted d-block mb-1">{helpText}</Form.Text>}
      <FieldError message={errorMessage || (isEmptyError ? 'Este campo es obligatorio' : '')} />
    </Form.Group>
  );
}
