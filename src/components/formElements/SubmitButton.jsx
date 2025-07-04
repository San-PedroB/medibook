// src/components/formElements/SubmitButton.jsx
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

/**
 * SubmitButton: botón de envío reutilizable.
 * Props:
 *  - disabled: bool
 *  - children: node (texto o elementos dentro)
 *  - text: string (texto alternativo si no hay children)
 *  - isLoading: bool (muestra spinner si true)
 */
export default function SubmitButton({ disabled, children, text, isLoading, isSubmitting }) {
  const loading = isLoading || isSubmitting;

  return (
    <Button type="submit" disabled={disabled || loading} className="btn-primary w-100 d-flex justify-content-center align-items-center">
      {loading && <Spinner animation="border" size="sm" className="me-2" />}
      {children || text}
    </Button>
  );
}
