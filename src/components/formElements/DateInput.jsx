// src/components/formElements/DateInput.jsx
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import FieldError from './FieldError';

export default function DateInput({
  name,
  label = 'Fecha',
  value = '',
  onChange = () => {},
  controlId,
  placeholder = 'dd/mm/yyyy',
  isInvalid = false,
  errorMessage = ''
}) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      setDisplay(`${dd}/${mm}/${yyyy}`);
    } else {
      setDisplay('');
    }
  }, [value]);

  const handleChange = e => {
    const digits = e.target.value.replace(/\D/g, '');
    let formatted;
    if (digits.length <= 2) formatted = digits;
    else if (digits.length <= 4) formatted = `${digits.slice(0,2)}/${digits.slice(2)}`;
    else formatted = `${digits.slice(0,2)}/${digits.slice(2,4)}/${digits.slice(4,8)}`;
    setDisplay(formatted);

    if (digits.length === 8) {
      const iso = `${digits.slice(4,8)}-${digits.slice(2,4)}-${digits.slice(0,2)}`;
      onChange({ target: { name, value: iso } });
    } else {
      onChange({ target: { name, value: '' } });
    }
  };

  return (
    <Form.Group controlId={controlId || name} className='mb-3'>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type='text'
        name={name}
        placeholder={placeholder}
        value={display}
        onChange={handleChange}
        maxLength={10}
        isInvalid={isInvalid}
      />
      <FieldError message={errorMessage} />
    </Form.Group>
  );
}
