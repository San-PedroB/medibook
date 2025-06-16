import React from "react";

function DescriptionInput({ value, onChange, label, error }) {
  return (
    <div className="form-group mb-3">
      <label>{label}</label>
      <textarea
        className={`form-control ${error ? "is-invalid" : ""}`}
        rows={4} // Un poco más largo que un input normal
        value={value}
        onChange={onChange}
        placeholder="Escribe una breve descripción o contexto..."
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default DescriptionInput;
