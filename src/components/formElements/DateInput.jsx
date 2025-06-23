// src/components/formElements/DateInput.jsx
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

export default function DateInput({ field, controlId, label = 'Fecha' }) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (field.value) {
      const d = new Date(field.value);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      setDisplay(`${dd}/${mm}/${yyyy}`);
    } else {
      setDisplay('');
    }
  }, [field.value]);

  const handleChange = e => {
    const digits = e.target.value.replace(/\D/g, '');
    let formatted;
    if (digits.length <= 2) formatted = digits;
    else if (digits.length <= 4) formatted = `${digits.slice(0,2)}/${digits.slice(2)}`;
    else formatted = `${digits.slice(0,2)}/${digits.slice(2,4)}/${digits.slice(4,8)}`;
    setDisplay(formatted);
    if (digits.length === 8) {
      const iso = `${digits.slice(4,8)}-${digits.slice(2,4)}-${digits.slice(0,2)}`;
      field.onChange({ target: { value: iso } });
    } else {
      field.onChange({ target: { value: '' } });
    }
  };

  return (
    <Form.Group controlId={controlId} className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type="text"
        placeholder="dd/mm/yyyy"
        value={display}
        onChange={handleChange}
        maxLength={10}
      />
    </Form.Group>
  );
}