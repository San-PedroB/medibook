// src/components/formElements/RutInput.jsx
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export function RutInput({ numberField, dvField, controlId, label = 'Rut', placeholderNumber = '', placeholderDv = '' }) {
  return (
    <Form.Group controlId={controlId} className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={placeholderNumber}
          value={numberField.value}
          onChange={numberField.onChange}
          maxLength={8}
        />
        <InputGroup.Text>-</InputGroup.Text>
        <Form.Control
          type="text"
          placeholder={placeholderDv}
          value={dvField.value}
          onChange={dvField.onChange}
          maxLength={1}
          style={{ maxWidth: '4rem' }}
        />
      </InputGroup>
    </Form.Group>
  );
}